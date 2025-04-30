const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// 임시 게시글 컨트롤러
const postController = {
  getPosts: (req, res) => {
    res.status(200).json({ success: true, message: '게시글 목록 기능 준비 중' });
  },
  getPost: (req, res) => {
    res.status(200).json({ success: true, message: '게시글 조회 기능 준비 중' });
  },
  createPost: (req, res) => {
    res.status(201).json({ success: true, message: '게시글 작성 기능 준비 중' });
  },
  updatePost: (req, res) => {
    res.status(200).json({ success: true, message: '게시글 수정 기능 준비 중' });
  },
  deletePost: (req, res) => {
    res.status(200).json({ success: true, message: '게시글 삭제 기능 준비 중' });
  },
  toggleLike: (req, res) => {
    res.status(200).json({ success: true, message: '게시글 좋아요 기능 준비 중' });
  },
  searchPosts: (req, res) => {
    res.status(200).json({ success: true, message: '게시글 검색 기능 준비 중' });
  },
  getUserPosts: (req, res) => {
    res.status(200).json({ success: true, message: '사용자 게시글 목록 기능 준비 중' });
  },
  getCategoryPosts: (req, res) => {
    res.status(200).json({ success: true, message: '카테고리별 게시글 목록 기능 준비 중' });
  }
};

// 게시글 기본 라우트
router.route('/')
  .get(postController.getPosts)
  .post(protect, postController.createPost);

// 특정 게시글 라우트
router.route('/:id')
  .get(postController.getPost)
  .put(protect, postController.updatePost)
  .delete(protect, postController.deletePost);

// 게시글 좋아요/좋아요 취소
router.route('/:id/like').put(protect, postController.toggleLike);

// 게시글 검색
router.get('/search', postController.searchPosts);

// 특정 사용자의 게시글 가져오기
router.get('/user/:userId', postController.getUserPosts);

// 특정 카테고리의 게시글 가져오기
router.get('/category/:category', postController.getCategoryPosts);

module.exports = router;