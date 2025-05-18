// routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { protect, checkOwnership } = require('../middleware/auth');
const Post = require('../models/Post');

/**
 * @swagger
 * tags:
 *   - name: AI
 *     description: AI 응답 관련 API
 */

/**
 * @swagger
 * /ai/generate/{postId}:
 *   post:
 *     summary: 게시글에 AI 응답 생성
 *     description: 게시글 내용을 분석하여 AI 응답을 생성합니다.
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: AI 응답 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     aiResponse:
 *                       type: string
 *                       description: AI가 생성한 응답
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
router.post('/generate/:postId', protect, aiController.generateAIResponse);

/**
 * @swagger
 * /ai/response/{postId}:
 *   delete:
 *     summary: 게시글의 AI 응답 삭제
 *     description: 게시글에 저장된 AI 응답을 삭제합니다.
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: AI 응답 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
router.delete('/response/:postId', protect, aiController.deleteAIResponse);

module.exports = router;