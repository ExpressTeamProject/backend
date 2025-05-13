import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { BookOpen, ArrowLeft } from "lucide-react";
import useLoginMutation from "@/query/useLoginMutation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending } = useLoginMutation();

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    login({ email, password }, { onSuccess: () => navigate("/") });
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
            <CardTitle className="text-2xl font-bold text-center">로그인</CardTitle>
            <CardDescription className="text-center">
              계정에 로그인하여 전공 문제를 공유하고 해결해보세요
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-lg border-gray-300 dark:border-gray-700 focus-visible:ring-teal-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">비밀번호</Label>
                  <Link to="/forgot-password" className="text-sm text-teal-500 hover:text-teal-600 hover:underline">
                    비밀번호 찾기
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                {isPending ? "로그인 중..." : "로그인"}
              </Button>
              <div className="text-center text-sm">
                계정이 없으신가요?{" "}
                <Link to="/register" className="text-teal-500 hover:text-teal-600 hover:underline">
                  회원가입
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
