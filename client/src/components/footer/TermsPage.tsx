import { Layout } from "../layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  FileText,
  Users,
  Shield,
  UserCheck,
  Server,
  MessageSquare,
  CreditCard,
  RefreshCw,
  AlertTriangle,
  Scale,
  Gavel,
} from "lucide-react";

const TermsPage = () => {
  return (
    <Layout>
      <div className="container py-8 md:py-12 lg:py-16 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">서비스 이용약관</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              학문공유 플랫폼을 이용하시기 전에 아래의 이용약관을 주의 깊게 읽어주시기 바랍니다.
            </p>
          </div>

          <Card className="mb-8 border-t-4 border-t-primary shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">제 1조 [목적]</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                본 약관은 학문공유가 제공하는 온라인 학습 및 공유 플랫폼과 관련된 제반 서비스(이하 '서비스'라 합니다.)를
                이용하는 사용자(이하 '회원'이라 합니다.)가 플랫폼의 서비스를 이용함에 있어 플랫폼과 회원 간의 권리, 의무
                및 책임사항, 그리고 기타 필요한 사항들을 명확하게 규정하는 것을 목적으로 합니다.
              </p>
            </CardContent>
          </Card>

          <Tabs defaultValue="terms" className="mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="terms">주요 조항</TabsTrigger>
              <TabsTrigger value="member">회원 관련</TabsTrigger>
              <TabsTrigger value="service">서비스 관련</TabsTrigger>
              <TabsTrigger value="legal">법적 사항</TabsTrigger>
            </TabsList>

            <TabsContent value="terms" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">제2조 [용어의 정의]</h2>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    본 약관에서 사용되는 용어의 정의는 다음과 같습니다.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <ul className="space-y-3">
                      <li className="flex gap-2">
                        <span className="font-semibold min-w-[80px]">서비스</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          웹, 모바일 등 다양한 장치를 통해 회원이 이용할 수 있는 플랫폼의 온라인 학습, 문제 해결,
                          커뮤니티 기능 등 일체의 서비스를 의미합니다.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold min-w-[80px]">회원</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          본 약관에 동의하고 플랫폼에 계정을 등록하여 플랫폼이 제공하는 서비스를 이용하는 개인 또는
                          단체를 의미합니다.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold min-w-[80px]">이용계약</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          서비스 이용과 관련하여 본 약관을 포함한 플랫폼과 회원 간의 모든 합의를 의미합니다.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold min-w-[80px]">계정</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          회원이 서비스에 접근하고 이용하기 위해 생성하는 식별자와 비밀번호의 조합을 의미합니다.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold min-w-[80px]">콘텐츠</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          플랫폼 내에 게시, 등록, 공유되는 텍스트, 이미지, 비디오, 코드, 문제, 해설 등 모든 형태의 정보
                          및 자료를 의미합니다.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    본 약관에서 정의되지 않은 용어는 관련 법령 및 서비스 안내에서 정하는 바에 따릅니다.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">제3조 [이용계약의 성립]</h2>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    이용계약은 서비스를 이용하고자 하는 자(이하 '가입신청자'라 합니다.)가 본 약관의 내용에 동의하고
                    플랫폼이 정한 절차에 따라 회원가입을 신청하면, 플랫폼이 이를 승낙함으로써 성립됩니다. 플랫폼은
                    가입신청자의 신청에 대해 원칙적으로 승낙합니다. 다만, 다음 각 호에 해당하는 경우 승낙을 거부하거나
                    이용계약을 해지할 수 있습니다.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <ol className="list-decimal ml-5 space-y-2 text-gray-700 dark:text-gray-300">
                      <li>가입신청자가 본 약관에 위배되는 행위를 한 경우</li>
                      <li>타인의 정보를 도용하거나 허위의 정보를 기재한 경우</li>
                      <li>만 14세 미만의 아동이 법정대리인의 동의 없이 가입을 신청한 경우</li>
                      <li>이미 플랫폼의 회원 자격을 상실한 적이 있는 경우</li>
                      <li>기술적인 문제로 서비스 제공이 어렵거나 플랫폼의 운영 정책에 위배되는 경우</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <RefreshCw className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">제4조 [약관의 효력 및 변경]</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p>
                      본 약관은 플랫폼의 웹사이트 또는 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써
                      효력이 발생합니다.
                    </p>
                    <p>
                      플랫폼은 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다. 약관을 변경할
                      경우에는 변경된 내용과 효력 발생일을 명시하여 서비스 내에 공지하거나 회원에게 통지합니다.
                    </p>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
                      <p className="font-medium">중요 안내</p>
                      <p>
                        회원은 변경된 약관에 동의하지 않을 경우 회원 탈퇴를 요청할 수 있습니다. 변경된 약관의 효력
                        발생일 이후에도 서비스를 계속 이용하는 경우 변경된 약관에 동의한 것으로 간주됩니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="member" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">제5조 [개인정보 보호]</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p>
                      플랫폼은 회원의 개인정보를 관련 법령 및 개인정보처리방침에 따라 보호합니다. 플랫폼의
                      개인정보처리방침은 서비스 내에 별도로 게시하며, 회원은 이를 확인하고 동의해야 합니다.
                    </p>
                    <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <p className="text-sm">
                        개인정보처리방침은{" "}
                        <a href="/privacy" className="text-primary underline">
                          개인정보 처리방침
                        </a>{" "}
                        페이지에서 확인하실 수 있습니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <UserCheck className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">제6조 [회원의 의무]</h2>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    회원은 서비스를 이용함에 있어 다음 각 호의 행위를 하여서는 안 됩니다.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <ScrollArea className="h-[200px] pr-4">
                      <ol className="list-decimal ml-5 space-y-3 text-gray-700 dark:text-gray-300">
                        <li>회원가입 신청 또는 정보 변경 시 허위 내용을 등록하는 행위</li>
                        <li>타인의 계정 또는 개인정보를 무단으로 사용하는 행위</li>
                        <li>플랫폼이 제공하는 정보를 변경하거나 플랫폼의 운영을 방해하는 행위</li>
                        <li>플랫폼 또는 제3자의 지적재산권을 침해하는 행위</li>
                        <li>플랫폼 또는 다른 회원의 명예를 훼손하거나 업무를 방해하는 행위</li>
                        <li>외설, 폭력적인 콘텐츠 등 공서양속에 반하는 정보를 게시, 유포하는 행위</li>
                        <li>플랫폼의 동의 없이 영리 목적으로 서비스를 이용하는 행위</li>
                        <li>기타 관련 법령 또는 본 약관에 위배되는 행위</li>
                      </ol>
                    </ScrollArea>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
                    <p className="font-medium">주의사항</p>
                    <p className="text-gray-700 dark:text-gray-300">
                      회원은 관련 법령, 본 약관의 규정, 이용 안내 및 서비스와 관련하여 공지된 주의사항, 플랫폼이
                      통지하는 사항 등을 준수하여야 합니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="service" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Server className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">제7조 [서비스의 제공 및 변경]</h2>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    플랫폼은 회원에게 다음과 같은 서비스를 제공합니다.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-1">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">온라인 학습 콘텐츠</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">다양한 주제의 학습 자료 제공</p>
                      </div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-1">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">문제 풀이 및 채점</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">자동화된 문제 풀이 및 채점 시스템</p>
                      </div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-1">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">질의응답 및 토론</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">회원 간 지식 공유 및 토론 기능</p>
                      </div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-1">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">커뮤니티 기능</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">게시판, 그룹 활동 등 제공</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                    <p className="text-gray-700 dark:text-gray-300">
                      플랫폼은 서비스의 내용, 이용 방법, 이용 시간 등을 변경, 중단할 수 있으며, 이 경우 변경 내용을
                      사전에 공지합니다.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">제8조 [게시물 관리]</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p>
                      회원이 서비스 내에 게시한 콘텐츠에 대한 저작권은 해당 회원에게 있습니다. 다만, 플랫폼은 서비스
                      운영, 홍보 등의 목적으로 회원의 게시물을 활용할 수 있습니다.
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="font-medium mb-2">게시물 관리 정책</p>
                      <p>
                        회원이 게시한 내용이 본 약관 또는 관련 법령에 위배되거나 플랫폼의 운영 정책에 어긋난다고 판단될
                        경우, 플랫폼은 해당 게시물을 삭제, 이동, 또는 비공개 처리할 수 있습니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">제9조 [유료 서비스]</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p>
                      플랫폼은 특정 콘텐츠 또는 기능을 유료로 제공할 수 있습니다. 유료 서비스의 이용 요금, 결제 방식,
                      이용 조건 등은 해당 서비스 이용 안내에 따릅니다.
                    </p>
                    <p>
                      유료 서비스 이용과 관련하여 회원이 결제한 금액에 대해서는 해당 서비스의 환불 규정에 따라 환불이
                      이루어질 수 있습니다.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <RefreshCw className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">제10조 [환불 정책]</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p>
                      유료 서비스의 환불은 관련 법령 및 플랫폼이 별도로 정한 환불 규정에 따라 처리됩니다. 회원의 단순
                      변심에 의한 환불은 제한될 수 있으며, 콘텐츠의 하자 등 플랫폼의 귀책 사유로 인한 환불은 플랫폼의
                      정책에 따라 진행됩니다.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded flex items-start gap-3">
                      <div className="mt-1">
                        <RefreshCw className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-sm">
                        각 유료 서비스의 구체적인 환불 조건은 해당 서비스 안내 페이지에서 확인하실 수 있습니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="legal" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">제11조 [서비스 이용의 제한 및 종료]</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                      <p className="font-medium mb-2">이용 제한 사유</p>
                      <p>
                        회원이 본 약관을 위반하거나 서비스 운영을 방해하는 경우, 플랫폼은 사전 통지 없이 회원의 서비스
                        이용을 제한하거나 이용계약을 해지할 수 있습니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Scale className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">제12조 [책임의 제한]</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p>
                      플랫폼은 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스
                      제공에 관한 책임이 면제됩니다.
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="font-medium mb-2">면책 사항</p>
                      <p>
                        플랫폼은 회원이 서비스 내에 게시 또는 전송한 정보, 자료, 사실의 신뢰성, 정확성 등에 대해서는
                        책임을 지지 않습니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Gavel className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">제13조 [준거법 및 재판 관할]</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p>
                      본 약관은 대한민국 법률에 따라 해석되고 적용됩니다. 플랫폼과 회원 간에 발생하는 서비스 이용과
                      관련된 소송은 대한민국 법원을 관할 법원으로 합니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="border border-muted-foreground/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">최종 업데이트: 2025. 05. 01</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
