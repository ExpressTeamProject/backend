const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// 임시 사용자 컨트롤러
const userController = {
  getUsers: (req, res) => {
    res.status(200).json({ success: true, message: '사용자 목록 기능 준비 중' });
  },
  getUser: (req, res) => {
    res.status(200).json({ success: true, message: '사용자 정보 조회 기능 준비 중' });
  },
  createUser: (req, res) => {
    res.status(201).json({ success: true, message: '사용자 생성 기능 준비 중' });
  },
  updateUser: (req, res) => {
    res.status(200).json({ success: true, message: '사용자 정보 업데이트 기능 준비 중' });
  },
  deleteUser: (req, res) => {
    res.status(200).json({ success: true, message: '사용자 삭제 기능 준비 중' });
  }
};

// 관리자만 접근 가능한 라우트
router.route('/')
  .get(protect, authorize('admin'), userController.getUsers)
  .post(protect, authorize('admin'), userController.createUser);

router.route('/:id')
  .get(protect, userController.getUser)
  .put(protect, authorize('admin'), userController.updateUser)
  .delete(protect, authorize('admin'), userController.deleteUser);

module.exports = router;