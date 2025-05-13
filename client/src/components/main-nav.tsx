import { Link } from "react-router";
import { BookOpen } from "lucide-react";

export function MainNav() {
  return (
    <div className="flex items-center gap-8 md:gap-12">
      <Link to="/" className="flex items-center space-x-2">
        <BookOpen className="h-6 w-6 text-teal-500" />
        <span className="font-bold inline-block text-xl">학문공유</span>
      </Link>
      <nav className="hidden md:flex gap-8">
        <Link to="/problems" className="text-sm font-medium transition-colors hover:text-teal-500">
          문제 목록
        </Link>
        <Link to="/solved" className="text-sm font-medium transition-colors hover:text-teal-500">
          해결된 문제
        </Link>
        <Link to="/community" className="text-sm font-medium transition-colors hover:text-teal-500">
          커뮤니티
        </Link>
        <Link to="/ranking" className="text-sm font-medium transition-colors hover:text-teal-500">
          랭킹
        </Link>
      </nav>
    </div>
  );
}
