import { Layout } from "../layout";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie, Shield, Settings } from "lucide-react";

const CookiePolicyPage = () => {
  return (
    <Layout>
      <div className="container py-8 md:py-12 lg:py-16 mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-3">쿠키 정책</h1>
          <p className="text-gray-600 dark:text-gray-400">
            본 쿠키 정책은 당사 웹사이트에서 쿠키를 사용하는 방법에 대한 정보를 제공합니다.
          </p>
        </div>

        <Card className="mb-6 border-l-4 border-l-teal-500 shadow-sm hover:shadow transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-lg">
                <Cookie className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-teal-700 dark:text-teal-400" id="what-are-cookies">
                  제 1조 [쿠키란 무엇인가요?]
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  쿠키는 웹사이트를 방문할 때 사용자의 컴퓨터 또는 모바일 장치에 저장되는 작은 텍스트 파일입니다. 쿠키는
                  웹사이트가 사용자의 방문 기록 및 설정 등을 기억하도록 도와주어 더욱 편리한 웹 환경을 제공합니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-l-4 border-l-teal-500 shadow-sm hover:shadow transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-teal-700 dark:text-teal-400" id="cookies-we-use">
                  제 2조 [회사가 사용하는 쿠키]
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  회사는 다음과 같은 목적으로 쿠키를 사용할 수 있습니다.
                </p>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-teal-500 mt-2 mr-2 flex-shrink-0"></span>
                    <div>
                      <span className="font-medium text-teal-700 dark:text-teal-400">필수 쿠키:</span> 웹사이트의
                      정상적인 작동 및 기능 제공에 필수적인 쿠키 (예: 로그인 유지)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-teal-500 mt-2 mr-2 flex-shrink-0"></span>
                    <div>
                      <span className="font-medium text-teal-700 dark:text-teal-400">분석 쿠키:</span> 웹사이트 이용
                      현황 분석, 사용자 행동 패턴 파악을 통한 서비스 개선
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-teal-500 mt-2 mr-2 flex-shrink-0"></span>
                    <div>
                      <span className="font-medium text-teal-700 dark:text-teal-400">기능 쿠키:</span> 사용자 설정 (예:
                      언어 설정) 저장 및 맞춤형 기능 제공
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-teal-500 mt-2 mr-2 flex-shrink-0"></span>
                    <div>
                      <span className="font-medium text-teal-700 dark:text-teal-400">광고 쿠키:</span> 사용자 관심사에
                      따른 맞춤형 광고 제공 (동의한 경우)
                    </div>
                  </li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  회사는 <span className="italic">[제3자 서비스 이름]</span>과 같은 제3자 서비스에서 제공하는 쿠키를
                  사용할 수도 있습니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-l-4 border-l-teal-500 shadow-sm hover:shadow transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-lg">
                <Settings className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-teal-700 dark:text-teal-400" id="managing-cookies">
                  제 3조 [쿠키 관리 방법]
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  사용자는 웹 브라우저 설정을 통해 쿠키 사용 여부를 선택할 수 있습니다. 모든 쿠키를 허용하거나, 쿠키가
                  저장될 때마다 확인하거나, 모든 쿠키의 저장을 거부할 수 있습니다. 다만, 쿠키 저장을 거부할 경우
                  웹사이트 이용에 불편이 발생할 수 있습니다.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mt-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    각 브라우저별 쿠키 설정 방법은 해당 브라우저의 도움말을 참고하시기 바랍니다.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center border-t border-gray-200 dark:border-gray-800 pt-6">
          <p>최종 업데이트: 2025. 05. 01</p>
        </div>
      </div>
    </Layout>
  );
};

export default CookiePolicyPage;
