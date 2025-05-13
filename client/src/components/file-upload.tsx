import type React from "react";
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { X, Upload, File, ImageIcon, FileText } from "lucide-react";

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  onRemove: (file: File) => void;
  value: File[];
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  maxFiles?: number;
}

export function FileUpload({
  onUpload,
  onRemove,
  value = [],
  accept = "*",
  multiple = true,
  maxSize = 10, // 10MB
  maxFiles = 5,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 타입에 따른 아이콘 선택
  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-6 w-6 text-blue-500" />;
    } else if (file.type.includes("pdf")) {
      return <FileText className="h-6 w-6 text-red-500" />;
    } else if (file.type.includes("word") || file.type.includes("document")) {
      return <FileText className="h-6 w-6 text-blue-700" />;
    } else if (file.type.includes("excel") || file.type.includes("sheet")) {
      return <FileText className="h-6 w-6 text-green-600" />;
    } else if (file.type.includes("powerpoint") || file.type.includes("presentation")) {
      return <FileText className="h-6 w-6 text-orange-500" />;
    } else {
      return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  // 파일 크기 포맷팅
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // 파일 유효성 검사
  const validateFiles = (files: File[]) => {
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    // 최대 파일 개수 검사
    if (value.length + files.length > maxFiles) {
      newErrors.push(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
      return { validFiles, errors: newErrors };
    }

    for (const file of files) {
      // 파일 크기 검사
      if (file.size > maxSize * 1024 * 1024) {
        newErrors.push(`${file.name}의 크기가 너무 큽니다. 최대 ${maxSize}MB까지 가능합니다.`);
        continue;
      }

      // 중복 파일 검사
      if (value.some((f) => f.name === file.name && f.size === file.size)) {
        newErrors.push(`${file.name}은(는) 이미 업로드되었습니다.`);
        continue;
      }

      validFiles.push(file);
    }

    return { validFiles, errors: newErrors };
  };

  // 파일 선택 핸들러
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const files = Array.from(fileList);
    const { validFiles, errors } = validateFiles(files);

    if (errors.length > 0) {
      setErrors(errors);
    }

    if (validFiles.length > 0) {
      simulateUpload(validFiles);
      onUpload([...value, ...validFiles]);
    }

    // 파일 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const fileList = e.dataTransfer.files;
    if (!fileList) return;

    const files = Array.from(fileList);
    const { validFiles, errors } = validateFiles(files);

    if (errors.length > 0) {
      setErrors(errors);
    }

    if (validFiles.length > 0) {
      simulateUpload(validFiles);
      onUpload([...value, ...validFiles]);
    }
  };

  // 업로드 시뮬레이션 (실제 구현에서는 API 호출)
  const simulateUpload = (files: File[]) => {
    const newProgress = { ...uploadProgress };

    files.forEach((file) => {
      newProgress[file.name] = 0;
    });

    setUploadProgress(newProgress);

    files.forEach((file) => {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const current = prev[file.name] || 0;
          const next = Math.min(current + 10, 100);

          const newProgress = { ...prev, [file.name]: next };

          if (next === 100) {
            clearInterval(interval);
          }

          return newProgress;
        });
      }, 200);
    });
  };

  // 파일 제거 핸들러
  const handleRemoveFile = (file: File) => {
    onRemove(file);
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[file.name];
      return newProgress;
    });
  };

  // 에러 제거 핸들러
  const handleDismissError = (index: number) => {
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full space-y-4">
      {/* 드래그 앤 드롭 영역 */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
            : "border-gray-300 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept={accept}
          multiple={multiple}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center space-y-2 cursor-pointer">
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
            <Upload className="h-6 w-6 text-teal-500" />
          </div>
          <h3 className="text-lg font-medium">파일을 여기에 끌어다 놓거나 클릭하세요</h3>
          <p className="text-sm text-muted-foreground">
            최대 {maxFiles}개 파일, 각 파일당 최대 {maxSize}MB
          </p>
          <p className="text-xs text-muted-foreground">{accept === "*" ? "모든 파일 형식" : accept} 지원</p>
        </div>
      </div>

      {/* 에러 메시지 */}
      {errors.length > 0 && (
        <div className="space-y-2">
          {errors.map((error, index) => (
            <div
              key={index}
              className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-md flex justify-between items-center"
            >
              <p className="text-sm">{error}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDismissError(index)}
                className="h-6 w-6 p-0 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* 업로드된 파일 목록 */}
      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((file, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 border rounded-md p-3 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                {getFileIcon(file)}
                <div>
                  <p className="font-medium text-sm truncate max-w-[200px] md:max-w-xs">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {uploadProgress[file.name] !== undefined && uploadProgress[file.name] < 100 ? (
                  <div className="w-20">
                    <Progress value={uploadProgress[file.name]} className="h-2" />
                  </div>
                ) : null}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFile(file)}
                  className="h-8 w-8 p-0 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
