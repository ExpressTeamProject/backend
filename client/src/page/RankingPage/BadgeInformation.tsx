import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, Medal, Trophy } from "lucide-react";

function BadgeInformation() {
  return (
    <Card className="border-none shadow-md dark:shadow-gray-800/30">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-teal-500" />
          배지 시스템 안내
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
              <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="font-medium mb-1">골드 배지</h3>
              <p className="text-sm text-muted-foreground">
                최고 품질의 문제 해결 또는 기여를 한 사용자에게 수여됩니다.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
              <Medal className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h3 className="font-medium mb-1">실버 배지</h3>
              <p className="text-sm text-muted-foreground">
                우수한 품질의 문제 해결 또는 기여를 한 사용자에게 수여됩니다.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
              <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-medium mb-1">브론즈 배지</h3>
              <p className="text-sm text-muted-foreground">양질의 문제 해결 또는 기여를 한 사용자에게 수여됩니다.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BadgeInformation;
