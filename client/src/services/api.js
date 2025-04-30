import axios from 'axios';

// API 기본 URL 설정
const API_URL = import.meta.env.MODE === 'production' 
  ? '/api' 
  : import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - JWT 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 오류 (인증 실패) 시 로그아웃 처리
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API 서비스
const apiService = {
  // 인증 관련 API
  auth: {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    logout: () => api.get('/auth/logout'),
    getMe: () => api.get('/auth/me'),
    updateDetails: (userData) => api.put('/auth/updatedetails', userData),
    updatePassword: (passwordData) => api.put('/auth/updatepassword', passwordData),
    forgotPassword: (email) => api.post('/auth/forgotpassword', { email }),
    resetPassword: (token, password) => 
      api.put(`/auth/resetpassword/${token}`, { password }),
  },
  
  // 게시글 관련 API
  posts: {
    getAll: (page = 1, limit = 10) => 
      api.get(`/posts?page=${page}&limit=${limit}`),
    getById: (id) => api.get(`/posts/${id}`),
    create: (postData) => api.post('/posts', postData),
    update: (id, postData) => api.put(`/posts/${id}`, postData),
    delete: (id) => api.delete(`/posts/${id}`),
    like: (id) => api.put(`/posts/${id}/like`),
    search: (query, page = 1, limit = 10) => 
      api.get(`/posts/search?q=${query}&page=${page}&limit=${limit}`),
    getByUser: (userId, page = 1, limit = 10) => 
      api.get(`/posts/user/${userId}?page=${page}&limit=${limit}`),
    getByCategory: (category, page = 1, limit = 10) => 
      api.get(`/posts/category/${category}?page=${page}&limit=${limit}`),
  },
  
  // 댓글 관련 API
  comments: {
    create: (postId, content) => 
      api.post('/comments', { postId, content }),
    getById: (id) => api.get(`/comments/${id}`),
    update: (id, content) => api.put(`/comments/${id}`, { content }),
    delete: (id) => api.delete(`/comments/${id}`),
    getByPost: (postId, page = 1, limit = 20) => 
      api.get(`/comments/post/${postId}?page=${page}&limit=${limit}`),
    createReply: (commentId, content) => 
      api.post(`/comments/reply/${commentId}`, { content }),
    like: (id) => api.put(`/comments/${id}/like`),
  },
};

export default apiService;