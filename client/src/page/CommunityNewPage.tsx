import type React from "react";
import { useState } from "react";
import { Layout } from "../components/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { MarkdownEditor } from "../components/markdown-editor";
import { TagInput } from "../components/tag-input";
import { FileUpload } from "../components/file-upload";

export default function CommunityNewPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    tags: [] as string[],
    files: [] as File[],
  });

  // 추천 태그 목록 (실제 구현에서는 API에서 가져옴)
  const suggestedTags = [
    "질문",
    "정보공유",
    "스터디모집",
    "프로젝트",
    "취업",
    "대학원",
    "수학",
    "물리학",
    "화학",
    "생물학",
    "컴퓨터공학",
    "전자공학",
    "기계공학",
    "경영학",
    "경제학",
    "심리학",
    "사회학",
    "인문학",
    "예술",
    "교육",
    "의학",
    "약학",
    "간호학",
    "법학",
    "행정학",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleFilesUpload = (files: File[]) => {
    setFormData((prev) => ({ ...prev, files }));
  };

  const handleFileRemove = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((f) => f !== file),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 구현에서는 API 호출로 데이터 저장
    console.log("커뮤니티 글 작성:", formData);

    // 제출 후 커뮤니티 페이지로 이동
    navigate("/community");
  };

  return (
    <Layout>
      <main className="flex-1 container py-8 px-4 md:px-8 max-w-full mx-auto">
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          <div className="flex items-center">
            <Link to="/community" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              커뮤니티로 돌아가기
            </Link>
          </div>

          <Card className="border-none shadow-lg dark:shadow-gray-800/30">
            <CardHeader>
              <CardTitle className="text-2xl">새 글 작성</CardTitle>
              <CardDescription>커뮤니티에 새로운 글을 작성하여 다른 사용자들과 정보를 공유하세요</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">제목</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="글의 제목을 입력하세요"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">카테고리</Label>
                  <Select onValueChange={handleCategoryChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="question">질문</SelectItem>
                      <SelectItem value="recruit">모집</SelectItem>
                      <SelectItem value="info">정보</SelectItem>
                      <SelectItem value="review">후기</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">내용</Label>
                  <MarkdownEditor
                    value={formData.content}
                    onChange={handleContentChange}
                    placeholder="글의 내용을 자세히 작성해주세요. 마크다운과 LaTeX 문법을 사용할 수 있습니다."
                    height={300}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="files">첨부 파일</Label>
                  <FileUpload
                    value={formData.files}
                    onUpload={handleFilesUpload}
                    onRemove={handleFileRemove}
                    accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                    maxSize={5}
                    maxFiles={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    이미지, PDF, 문서 파일을 첨부할 수 있습니다. 최대 3개, 각 파일당 최대 5MB까지 가능합니다.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">태그</Label>
                  <TagInput
                    value={formData.tags}
                    onChange={handleTagsChange}
                    placeholder="태그를 입력하세요 (Enter로 추가)"
                    suggestions={suggestedTags}
                    maxTags={5}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    최대 5개의 태그를 추가할 수 있습니다. 관련 태그를 추가하면 더 많은 사용자에게 글이 노출됩니다.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" asChild>
                  <Link to="/community">취소</Link>
                </Button>
                <Button type="submit" className="bg-teal-500 hover:bg-teal-600 transition-colors">
                  글 등록
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </Layout>
  );
}
