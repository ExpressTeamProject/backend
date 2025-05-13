import type React from "react";
import { Link, useLocation } from "react-router";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { Plus, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Footer from "./footer";
import MobileFooterNav from "./mobile-footer-nav";
import useLoginStore from "@/store/useLoginStore";

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export function Layout({ children, hideFooter = false }: LayoutProps) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [showFab, setShowFab] = useState(false);

  const { token } = useLoginStore();
  const isLoggedIn = !!token;
  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 현재 경로에 따라 FAB 표시 여부 결정
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/problems" || location.pathname === "/community") {
      setShowFab(true);
    } else {
      setShowFab(false);
    }
  }, [location]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <header
        className={`sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md dark:bg-gray-950/80 dark:border-gray-800 transition-shadow ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="container flex h-16 items-center justify-between py-4 px-4 md:px-8 max-w-full mx-auto">
          <MainNav />
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                    3
                  </span>
                </Button>
                <Link to="/user/:username">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">U</span>
                  </div>
                </Link>
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
          <MobileNav />
        </div>
      </header>

      {children}

      {/* 모바일 FAB (Floating Action Button) */}
      {showFab && (
        <div className="fixed bottom-6 right-6 md:hidden z-30">
          <Link
            to={location.pathname === "/community" ? "/community/new" : "/problems/new"}
            className="flex items-center justify-center h-14 w-14 rounded-full bg-teal-500 text-white shadow-lg hover:bg-teal-600 transition-colors"
          >
            <Plus className="h-6 w-6" />
          </Link>
        </div>
      )}

      {/* 모바일 하단 네비게이션 바 */}
      <MobileFooterNav />

      {!hideFooter && <Footer />}
    </div>
  );
}
