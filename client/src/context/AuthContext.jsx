import { createContext, useState, useContext, useEffect } from 'react';
import apiService from '../services/api';
import jwtDecode from 'jwt-decode';

// 인증 컨텍스트 생성
const AuthContext = createContext();

// 인증 상태 제공자 컴포넌트
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 페이지 로드 시 로컬 스토리지에서 사용자 정보 확인
  useEffect(() => {
    const checkLoggedIn = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        
        // 토큰이 없으면 로그아웃 상태
        if (!token) {
          setIsAuthenticated(false);
          setCurrentUser(null);
          setIsLoading(false);
          return;
        }
        
        // 토큰 만료 확인
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp < currentTime) {
          // 토큰 만료 시 로그아웃 처리
          logout();
          setIsLoading(false);
          return;
        }
        
        // 유효한 토큰이 있으면 사용자 정보 가져오기
        const response = await apiService.auth.getMe();
        setCurrentUser(response.data.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('인증 확인 오류:', error);
        setIsAuthenticated(false);
        setCurrentUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // 로그인 함수
  const login = async (email, password) => {
    setError(null);
    try {
      const response = await apiService.auth.login({ email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setCurrentUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message || '로그인 중 오류가 발생했습니다'
      );
      throw error;
    }
  };

  // 회원가입 함수
  const register = async (userData) => {
    setError(null);
    try {
      const response = await apiService.auth.register(userData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setCurrentUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message || '회원가입 중 오류가 발생했습니다'
      );
      throw error;
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await apiService.auth.logout();
    } catch (error) {
      console.error('로그아웃 오류:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  };

  // 사용자 정보 업데이트 함수
  const updateUserDetails = async (userData) => {
    setError(null);
    try {
      const response = await apiService.auth.updateDetails(userData);
      setCurrentUser(response.data.data);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message || '정보 업데이트 중 오류가 발생했습니다'
      );
      throw error;
    }
  };

  // 비밀번호 변경 함수
  const updatePassword = async (passwordData) => {
    setError(null);
    try {
      const response = await apiService.auth.updatePassword(passwordData);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message || '비밀번호 변경 중 오류가 발생했습니다'
      );
      throw error;
    }
  };

  // 비밀번호 찾기 함수
  const forgotPassword = async (email) => {
    setError(null);
    try {
      const response = await apiService.auth.forgotPassword(email);
      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message || '비밀번호 찾기 중 오류가 발생했습니다'
      );
      throw error;
    }
  };

  // 비밀번호 재설정 함수
  const resetPassword = async (token, password) => {
    setError(null);
    try {
      const response = await apiService.auth.resetPassword(token, password);
      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message || '비밀번호 재설정 중 오류가 발생했습니다'
      );
      throw error;
    }
  };

  // 컨텍스트 값
  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateUserDetails,
    updatePassword,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 인증 컨텍스트 사용 훅
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;