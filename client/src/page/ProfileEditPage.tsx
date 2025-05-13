import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Layout } from "../components/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ArrowLeft, Camera } from "lucide-react";

export default function ProfileEditPage() {
  const navigate = useNavigate();

  // 현재 사용자 정보 (실제 구현에서는 API에서 가져옴)
  const [formData, setFormData] = useState({
    username: "mathprofessor",
    displayName: "수학 교수",
    email: "math.professor@example.com",
    bio: "수학과 교수로 미분방정식과 선형대수학을 가르치고 있습니다. 학생들의 질문에 답변하고 도움을 주는 것을 좋아합니다.",
    major: "수학",
    avatar: "/musical-performance.png",
    website: "https://example.com/mathprofessor",
    socialLinks: {
      github: "github.com/mathprofessor",
      twitter: "twitter.com/mathprofessor",
    },
    profileImage: null as File | null,
  });

  // 전공 목록
  const majors = [
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
    "기타",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleMajorChange = (value: string) => {
    setFormData((prev) => ({ ...prev, major: value }));
  };

  const handleProfileImageUpload = (files: File[]) => {
    if (files.length > 0) {
      setFormData((prev) => ({ ...prev, profileImage: files[0] }));
    }
  };

  const handleProfileImageRemove = () => {
    setFormData((prev) => ({ ...prev, profileImage: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 실제 구현에서는 API 호출로 데이터 저장
    console.log("프로필 업데이트:", formData);

    // 성공 시 프로필 페이지로 이동
    navigate(`/user/${formData.username}`);
  };

  return (
    <Layout>
      <div className="container py-8 px-4 md:px-8 max-w-full mx-auto">
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          <div className="flex items-center">
            <Link
              to={`/user/${formData.username}`}
              className="flex items-center text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              프로필로 돌아가기
            </Link>
          </div>

          <Card className="border-none shadow-lg dark:shadow-gray-800/30">
            <CardHeader>
              <CardTitle className="text-2xl">프로필 편집</CardTitle>
              <CardDescription>프로필 정보를 수정하여 다른 사용자들에게 나를 소개하세요</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* 프로필 이미지 */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800 shadow-md">
                      <AvatarImage
                        src={formData.profileImage ? URL.createObjectURL(formData.profileImage) : formData.avatar}
                        alt={formData.displayName}
                      />
                      <AvatarFallback className="text-4xl">{formData.displayName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <label
                      htmlFor="profile-image-upload"
                      className="absolute bottom-0 right-0 bg-teal-500 text-white p-2 rounded-full cursor-pointer hover:bg-teal-600 transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">프로필 이미지 변경</span>
                    </label>
                    <input
                      id="profile-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleProfileImageUpload([e.target.files[0]]);
                        }
                      }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">프로필 이미지를 변경하려면 이미지를 클릭하세요</p>
                </div>

                {/* 기본 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">사용자 이름 (ID)</Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      disabled
                      className="bg-gray-50 dark:bg-gray-900"
                    />
                    <p className="text-xs text-muted-foreground">사용자 이름은 변경할 수 없습니다</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="displayName">표시 이름</Label>
                    <Input
                      id="displayName"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">자기소개</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="자신에 대한 소개를 작성해주세요"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="major">전공</Label>
                  <Select value={formData.major} onValueChange={handleMajorChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="전공 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {majors.map((major) => (
                        <SelectItem key={major} value={major}>
                          {major}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 소셜 링크 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">소셜 미디어</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm">
                          github.com/
                        </span>
                        <Input
                          id="github"
                          name="github"
                          value={formData.socialLinks.github.replace("github.com/", "")}
                          onChange={handleSocialLinkChange}
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm">
                          twitter.com/
                        </span>
                        <Input
                          id="twitter"
                          name="twitter"
                          value={formData.socialLinks.twitter.replace("twitter.com/", "")}
                          onChange={handleSocialLinkChange}
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 계정 설정 링크 */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-2">계정 설정</h3>
                  <div className="flex flex-col gap-2">
                    <Link to="/settings/password" className="text-teal-500 hover:text-teal-600 transition-colors">
                      비밀번호 변경
                    </Link>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" asChild>
                  <Link to={`/user/${formData.username}`}>취소</Link>
                </Button>
                <Button type="submit" className="bg-teal-500 hover:bg-teal-600 transition-colors">
                  변경사항 저장
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
