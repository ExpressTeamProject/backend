const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// 임시 댓글 컨트롤러
const commentController = {
  createComment: (req, res) => {
    res.status(201).json({ success: true, message: '댓글 작성 기능 준비 중' });
  },
  getComment: (req, res) => {
    res.status(200).json({ success: true, message: '댓글 조회 기능 준비 중' });
  },
  updateComment: (req, res) => {
    res.status(200).json({ success: true, message: '댓글 수정 기능 준비 중' });
  },
  deleteComment: (req, res) => {
    res.status(200).json({ success: true, message: '댓글 삭제 기능 준비 중' });
  },
  getPostComments: (req, res) => {
    res.status(200).json({ success: true, message: '게시글 댓글 목록 기능 준비 중' });
  },
  createReply: (req, res) => {
    res.status(201).json({ success: true, message: '대댓글 작성 기능 준비 중' });
  },
  toggleLike: (req, res) => {
    res.status(200).json({ success: true, message: '댓글 좋아요 기능 준비 중' });
  }
};

// 댓글 기본 라우트
router.route('/')
  .post(protect, commentController.createComment);

// 특정 댓글 라우트
router.route('/:id')
  .get(commentController.getComment)
  .put(protect, commentController.updateComment)
  .delete(protect, commentController.deleteComment);

// 게시글별 댓글 가져오기
router.get('/post/:postId', commentController.getPostComments);

// 대댓글 작성
router.post('/reply/:commentId', protect, commentController.createReply);

// 댓글 좋아요/좋아요 취소
router.put('/:id/like', protect, commentController.toggleLike);

module.exports = router;