import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// 레이아웃
import Layout from './components/layout/Layout'

// 임시 구성 페이지
/*
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import UserProfile from './pages/UserProfile'
import PostsList from './pages/PostsList'
import PostDetail from './pages/PostDetail'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import NotFound from './pages/NotFound'
*/

// 보호된 라우트 컴포넌트
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // 로딩 중일 때는 로딩 표시
  if (isLoading) {
    return <div className="loading">로딩 중...</div>;
  }

  // 인증되지 않았으면 로그인 페이지로 리디렉션
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      {/* 공개 라우트 */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="posts" element={<PostsList />} />
        <Route path="posts/:id" element={<PostDetail />} />
        <Route path="posts/category/:category" element={<PostsList />} />
        <Route path="posts/user/:userId" element={<PostsList />} />
        <Route path="user/:id" element={<UserProfile />} />

        {/* 보호된 라우트 */}
        <Route
          path="posts/create"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route
          path="posts/edit/:id"
          element={
            <PrivateRoute>
              <EditPost />
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />

        {/* 404 페이지 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;