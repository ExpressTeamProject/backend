"use client";

import type React from "react";
import { useState } from "react";
import { Layout } from "../layout";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface ContactForm {
  title: string;
  userId: string;
  category: string;
  content: string;
  attachments: FileList | null;
}

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    title: "",
    userId: "",
    category: "",
    content: "",
    attachments: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, attachments: e.target.files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("userId", formData.userId);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("content", formData.content);

    if (formData.attachments) {
      for (let i = 0; i < formData.attachments.length; i++) {
        formDataToSend.append("attachments", formData.attachments[i]);
      }
    }

    try {
      // 실제 API 호출 (여기서는 시뮬레이션)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage("문의가 성공적으로 접수되었습니다.");
      setFormData({
        title: "",
        userId: "",
        category: "",
        content: "",
        attachments: null,
      });
    } catch (error) {
      console.error("문의 전송 실패:", error);
      setMessage("문의 전송 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto px-4 py-12">
        <div className="flex justify-center mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-600"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <h1 className="text-2xl font-medium mb-2">문의하기</h1>
            <p className="text-gray-600 max-w-md">
              궁금한 점이나 문제가 있으시면 아래 양식을 통해 문의해주세요. 빠른 시일 내에 답변 드리겠습니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium mb-4">문의 안내</h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mt-1 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-sm">문의 접수</h3>
                  <p className="text-sm text-gray-600 mt-1">양식을 작성하여 문의를 접수해주세요.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-sm">처리 시간</h3>
                  <p className="text-sm text-gray-600 mt-1">평일 기준 1-2일 내에 답변 드립니다.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-sm">문의 확인</h3>
                  <p className="text-sm text-gray-600 mt-1">마이페이지에서 문의 내역을 확인할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium mb-4">문의 양식</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-medium">
                  제목
                </Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="문의 제목을 입력해주세요"
                  className="mt-1 h-10"
                  required
                />
              </div>

              <div>
                <Label htmlFor="userId" className="text-sm font-medium">
                  아이디
                </Label>
                <Input
                  type="text"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  placeholder="아이디를 입력해주세요"
                  className="mt-1 h-10"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-sm font-medium">
                  카테고리
                </Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange as any}
                  className="w-full mt-1 h-10 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled>
                    문의 카테고리 선택
                  </option>
                  <option value="오류/에러">오류/에러</option>
                  <option value="질문">질문</option>
                  <option value="회원탈퇴 및 데이터 삭제">회원탈퇴 및 데이터 삭제</option>
                  <option value="소스 저작권 문제">소스 저작권 문제</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div>
                <Label htmlFor="content" className="text-sm font-medium">
                  내용
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="문의 내용을 자세히 입력해주세요"
                  rows={5}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="attachments" className="text-sm font-medium">
                  사진 첨부
                </Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <div className="flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400 mb-2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <p className="text-sm text-gray-600">이미지를 드래그하거나 클릭하여 업로드</p>
                    <p className="text-xs text-gray-500 mt-1">최대 3장, 파일당 5MB 이하</p>
                    <input
                      type="file"
                      id="attachments"
                      name="attachments"
                      onChange={handleFileChange}
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {message && (
                <div
                  className={`p-3 rounded-md ${
                    message.includes("성공")
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-gray-200">
                <Button type="submit" disabled={loading} className="bg-gray-900 hover:bg-gray-800 text-white">
                  {loading ? "보내는 중..." : "문의하기"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUsPage;
