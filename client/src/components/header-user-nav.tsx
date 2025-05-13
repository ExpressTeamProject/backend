import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Bell, LogOut, Settings, User, Edit } from "lucide-react";
import { Badge } from "./ui/badge";

export function HeaderUserNav() {
  // 현재 로그인한 사용자 정보 (실제 구현에서는 인증 상태에서 가져옴)
  const currentUser = {
    username: "mathprofessor",
    displayName: "수학 교수",
    avatar: "/musical-performance.png",
    notifications: 3,
  };

  // 로그인 상태 (실제 구현에서는 인증 상태에서 가져옴)
  const isLoggedIn = true;

  return (
    <div className="flex items-center gap-2">
      {isLoggedIn ? (
        <>
          {/* 알림 버튼 */}
          <Button variant="ghost" size="icon" className="relative hidden md:flex">
            <Bell className="h-5 w-5" />
            {currentUser.notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500">
                {currentUser.notifications}
              </Badge>
            )}
          </Button>

          {/* 사용자 드롭다운 메뉴 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.username} />
                  <AvatarFallback>{currentUser.displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{currentUser.displayName}</p>
                  <p className="text-xs leading-none text-muted-foreground">@{currentUser.username}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link to={`/user/${currentUser.username}`}>
                    <User className="mr-2 h-4 w-4" />
                    <span>프로필</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/user/${currentUser.username}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>프로필 편집</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>설정</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>로그아웃</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="ghost" className="rounded-full">
              로그인
            </Button>
          </Link>
          <Link to="/register">
            <Button className="rounded-full bg-teal-500 hover:bg-teal-600 transition-colors">회원가입</Button>
          </Link>
        </>
      )}
    </div>
  );
}
