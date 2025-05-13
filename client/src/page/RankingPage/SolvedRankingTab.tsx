import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ReactNode } from "react";

function SolvedRankingTab({ users, rankIcons }: { users: any[]; rankIcons: Record<number, ReactNode> }) {
  return (
    <Card className="border-none shadow-md dark:shadow-gray-800/30">
      <CardHeader>
        <CardTitle className="text-xl">해결 랭킹</CardTitle>
        <CardDescription>해결한 문제 수 기준 상위 사용자</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium">순위</th>
                <th className="text-left py-3 px-4 font-medium">사용자</th>
                <th className="text-left py-3 px-4 font-medium">전공</th>
                <th className="text-center py-3 px-4 font-medium">해결 문제</th>
                <th className="text-center py-3 px-4 font-medium">평판</th>
                <th className="text-center py-3 px-4 font-medium">배지</th>
              </tr>
            </thead>
            <tbody>
              {users
                .sort((a, b) => b.solvedProblems - a.solvedProblems)
                .map((user, index) => (
                  <tr key={user.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {index + 1 <= 3 ? (
                          rankIcons[(index + 1) as keyof typeof rankIcons]
                        ) : (
                          <span className="font-medium">{index + 1}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                          <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.username}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800">
                        {user.major}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center font-medium">{user.solvedProblems}</td>
                    <td className="py-3 px-4 text-center">{user.reputation}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                          {user.badges.gold}
                        </Badge>
                        <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          {user.badges.silver}
                        </Badge>
                        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                          {user.badges.bronze}
                        </Badge>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default SolvedRankingTab;
