import { BookOpen, MessageSquare } from "lucide-react";
import { Link } from "react-router";

function MobileFooterNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 z-30">
      <div className="flex justify-around items-center h-16">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center w-full h-full ${
            location.pathname === "/" ? "text-teal-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-xs mt-1">홈</span>
        </Link>
        <Link
          to="/problems"
          className={`flex flex-col items-center justify-center w-full h-full ${
            location.pathname.startsWith("/problems") ? "text-teal-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-xs mt-1">문제</span>
        </Link>
        <Link
          to="/community"
          className={`flex flex-col items-center justify-center w-full h-full ${
            location.pathname.startsWith("/community") ? "text-teal-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs mt-1">커뮤니티</span>
        </Link>
        <Link
          to="/search"
          className={`flex flex-col items-center justify-center w-full h-full ${
            location.pathname === "/search" ? "text-teal-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span className="text-xs mt-1">검색</span>
        </Link>
        <Link
          to="/user/mathprofessor"
          className={`flex flex-col items-center justify-center w-full h-full ${
            location.pathname.startsWith("/user") ? "text-teal-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="text-xs mt-1">프로필</span>
        </Link>
      </div>
    </div>
  );
}

export default MobileFooterNav;
