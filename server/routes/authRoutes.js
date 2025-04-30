const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// POST /api/auth/register - 회원가입
router.post('/register', authController.register);

// POST /api/auth/login - 로그인
router.post('/login', authController.login);

// GET /api/auth/logout - 로그아웃
router.get('/logout', authController.logout);

// GET /api/auth/me - 현재 로그인한 사용자 정보
router.get('/me', protect, authController.getMe);

// PUT /api/auth/updatedetails - 사용자 정보 업데이트
router.put('/updatedetails', protect, authController.updateDetails);

// PUT /api/auth/updatepassword - 비밀번호 변경
console.log('authController:', authController);
console.log('updatePassword function:', authController.updatePassword);
router.put('/updatepassword', protect, authController.updatePassword || ((req, res) => {
    res.status(500).json({ message: 'updatePassword 함수가 구현되지 않았습니다' });
  }));

// POST /api/auth/forgotpassword - 비밀번호 재설정 이메일 발송
router.post('/forgotpassword', authController.forgotPassword);

// PUT /api/auth/resetpassword/:resettoken - 비밀번호 재설정
router.put('/resetpassword/:resettoken', authController.resetPassword);

module.exports = router;