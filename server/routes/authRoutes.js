const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const upload = require('../utils/fileUpload');

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: 인증 관련 API
 *   - name: Users
 *     description: 사용자 관리 API
 *   - name: Posts
 *     description: 게시글 관련 API
 *   - name: Comments
 *     description: 댓글 관련 API
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - nickname
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               nickname:
 *                 type: string
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: 유효하지 않은 입력값
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: 유효하지 않은 인증 정보
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: 로그아웃
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get('/logout', authController.logout);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: 현재 로그인한 사용자 정보
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 현재 사용자 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/me', protect, authController.getMe);

/**
 * @swagger
 * /auth/updatedetails:
 *   put:
 *     summary: 사용자 정보 업데이트
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: 사용자 닉네임
 *               email:
 *                 type: string
 *                 description: 사용자 이메일
 *               bio:
 *                 type: string
 *                 description: 자기소개 (최대 500자)
 *               major:
 *                 type: string
 *                 enum: [수학, 물리학, 화학, 생물학, 컴퓨터공학, 전자공학, 기계공학, 경영학, 경제학, 심리학, 사회학, 기타]
 *                 description: 전공 분야
 *               website:
 *                 type: string
 *                 description: 개인 웹사이트 URL
 *               socialLinks:
 *                 type: object
 *                 properties:
 *                   github:
 *                     type: string
 *                     description: Github 프로필 URL
 *                   twitter:
 *                     type: string
 *                     description: Twitter 프로필 URL
 *     responses:
 *       200:
 *         description: 정보 업데이트 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put('/updatedetails', protect, authController.updateDetails);

/**
 * @swagger
 * /auth/profile-image:
 *   put:
 *     summary: 프로필 이미지 업로드
 *     description: 사용자의 프로필 이미지를 업로드하거나 변경합니다.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 프로필 이미지 (5MB 이하, 이미지 형식만 허용)
 *     responses:
 *       200:
 *         description: 프로필 이미지 업로드 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: 잘못된 요청 (이미지 없음 또는 잘못된 형식)
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put(
  '/profile-image',
  protect,
  upload.profileImage.single('image'),
  authController.updateProfileImage
);

/**
 * @swagger
 * /auth/updatepassword:
 *   put:
 *     summary: 비밀번호 변경
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: 비밀번호 변경 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       400:
 *         description: 비밀번호가 일치하지 않음
 */
router.put('/updatepassword', protect, authController.updatePassword);

/**
 * @swagger
 * /auth/forgotpassword:
 *   post:
 *     summary: 비밀번호 찾기
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: 비밀번호 재설정 토큰 발급
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 resetToken:
 *                   type: string
 *       404:
 *         description: 해당 이메일로 등록된 사용자가 없음
 */
router.post('/forgotpassword', authController.forgotPassword);

/**
 * @swagger
 * /auth/resetpassword/{resettoken}:
 *   put:
 *     summary: 비밀번호 재설정
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: resettoken
 *         schema:
 *           type: string
 *         required: true
 *         description: 비밀번호 재설정 토큰
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 비밀번호 재설정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       400:
 *         description: 유효하지 않은 토큰
 */
router.put('/resetpassword/:resettoken', authController.resetPassword);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: 액세스 토큰 리프레시
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: 리프레시 토큰
 *     responses:
 *       200:
 *         description: 토큰 리프레시 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: 유효하지 않은 리프레시 토큰
 */
router.post('/refresh-token', authController.refreshToken);

module.exports = router;