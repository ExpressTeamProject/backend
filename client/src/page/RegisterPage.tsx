import type React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { BookOpen, ArrowLeft } from "lucide-react";
import useSignUpMutation from "@/query/useSignUpMutation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  /* username, email, password, nickname }*/
  const { mutate: signup, isPending } = useSignUpMutation();

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    signup(
      {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        nickname: formData.nickname,
      },
      { onSuccess: () => navigate("/login") }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-md mx-auto">
        <Card className="w-full border-none shadow-lg dark:shadow-gray-800/30">
          <CardHeader className="space-y-1">
            <div className="flex justify-between items-center mb-4">
              <Link to="/" className="text-gray-500 hover:text-teal-500 transition-colors flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>홈으로</span>
              </Link>
              <Link to="/" className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-teal-500" />
                <span className="font-bold text-xl">학문공유</span>
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold text-center">회원가입</CardTitle>
            <CardDescription className="text-center">
              새 계정을 만들어 전공 문제를 공유하고 해결해보세요
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">사용자 이름</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="사용자 이름"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="rounded-lg border-gray-300 dark:border-gray-700 focus-visible:ring-teal-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nickname">별명</Label>
                <Input
                  id="nickname"
                  name="nickname"
                  placeholder="별명"
                  value={formData.nickname}
                  onChange={handleChange}
                  required
                  className="rounded-lg border-gray-300 dark:border-gray-700 focus-visible:ring-teal-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="rounded-lg border-gray-300 dark:border-gray-700 focus-visible:ring-teal-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="rounded-lg border-gray-300 dark:border-gray-700 focus-visible:ring-teal-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="rounded-lg border-gray-300 dark:border-gray-700 focus-visible:ring-teal-500"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-4">
              <Button
                type="submit"
                className="w-full rounded-lg bg-teal-500 hover:bg-teal-600 transition-colors"
                onClick={() => {}}
              >
                {isPending ? "회원가입 중..." : "회원가입"}
                회원가입
              </Button>
              <div className="text-center text-sm">
                이미 계정이 있으신가요?{" "}
                <Link to="/login" className="text-teal-500 hover:text-teal-600 hover:underline">
                  로그인
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
