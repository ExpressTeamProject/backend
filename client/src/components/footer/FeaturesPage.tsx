import { Layout } from "../layout";
import { Card, CardContent } from "../ui/card";
import { MessageSquare, Users, BookOpen, Share2, User, Tag } from "lucide-react";

const FeaturesPage = () => {
  return (
    <Layout>
      <div className="container py-8 md:py-12 lg:py-16 mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-4 text-center text-teal-700 dark:text-teal-400">
          커뮤니티 기능
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          학문공유 플랫폼에서 제공하는 다양한 커뮤니티 기능을 통해 함께 성장하는 학습 경험을 만들어보세요.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-teal-100 dark:border-teal-900 hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <div className="bg-teal-100 dark:bg-teal-900/50 p-2 rounded-lg mr-4">
                  <MessageSquare className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h2 className="text-xl font-semibold text-teal-700 dark:text-teal-400">자유로운 질문과 답변</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                학습하다가 궁금한 점이나 해결되지 않는 문제를 자유롭게 질문하고, 다른 사용자들의 답변을 통해 궁금증을
                해결할 수 있습니다. 서로 지식을 공유하고 함께 성장하는 커뮤니티를 경험해 보세요.
              </p>
            </CardContent>
          </Card>

          <Card className="border-teal-100 dark:border-teal-900 hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <div className="bg-teal-100 dark:bg-teal-900/50 p-2 rounded-lg mr-4">
                  <BookOpen className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h2 className="text-xl font-semibold text-teal-700 dark:text-teal-400">다양한 주제별 토론</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                특정 문제에 대한 풀이 방법, 학습 전략, CS 지식 등 다양한 주제에 대해 다른 사용자들과 의견을 나누고
                토론할 수 있습니다. 폭넓은 관점을 배우고 깊이 있는 이해를 얻을 수 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card className="border-teal-100 dark:border-teal-900 hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <div className="bg-teal-100 dark:bg-teal-900/50 p-2 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h2 className="text-xl font-semibold text-teal-700 dark:text-teal-400">스터디 그룹 조직 및 참여</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                함께 학습할 스터디 그룹을 직접 조직하거나, 관심 있는 스터디 그룹에 참여하여 동료들과 함께 꾸준히 학습해
                나갈 수 있습니다. 서로 동기 부여를 받고 협력하여 학습 효과를 높여보세요.
              </p>
            </CardContent>
          </Card>

          <Card className="border-teal-100 dark:border-teal-900 hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <div className="bg-teal-100 dark:bg-teal-900/50 p-2 rounded-lg mr-4">
                  <Share2 className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h2 className="text-xl font-semibold text-teal-700 dark:text-teal-400">정보 공유 및 자료 공유</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                유용한 학습 자료, 팁, 뉴스 등을 다른 사용자들과 공유하고, 다른 사용자들이 공유한 자료를 통해 학습에
                도움을 받을 수 있습니다. 함께 만들어가는 풍부한 학습 환경을 경험해 보세요.
              </p>
            </CardContent>
          </Card>

          <Card className="border-teal-100 dark:border-teal-900 hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <div className="bg-teal-100 dark:bg-teal-900/50 p-2 rounded-lg mr-4">
                  <User className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h2 className="text-xl font-semibold text-teal-700 dark:text-teal-400">사용자 프로필 및 활동</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                자신의 프로필을 설정하고, 커뮤니티 활동 내역 (작성한 글, 댓글 등)을 다른 사용자들과 공유할 수 있습니다.
                활발한 활동을 통해 커뮤니티에 기여하고 다른 사용자들과 소통해 보세요.
              </p>
            </CardContent>
          </Card>

          <Card className="border-teal-100 dark:border-teal-900 hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <div className="bg-teal-100 dark:bg-teal-900/50 p-2 rounded-lg mr-4">
                  <Tag className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h2 className="text-xl font-semibold text-teal-700 dark:text-teal-400">태그 검색 및 필터링</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                관심 있는 특정 주제나 키워드에 대한 글을 태그 검색을 통해 쉽게 찾아볼 수 있으며, 다양한 필터링 옵션을
                활용하여 원하는 정보를 빠르게 얻을 수 있습니다.
              </p>
            </CardContent>
          </Card>

          {/* 필요하다면 더 많은 커뮤니티 기능 소개 카드 추가 */}
        </div>
      </div>
    </Layout>
  );
};

export default FeaturesPage;
