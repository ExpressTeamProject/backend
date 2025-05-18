// routes/savedItemsRoutes.js

const express = require('express');
const router = express.Router();
const savedItemsController = require('../controllers/savedItemsController');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /user/saved-items:
 *   get:
 *     summary: 사용자가 저장한 항목 목록 조회
 *     tags: [SavedItems]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 저장된 항목 목록
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
 *                     posts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Post'
 *                     articles:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Article'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/', protect, savedItemsController.getSavedItems);

/**
 * @swagger
 * /user/saved-items/toggle:
 *   post:
 *     summary: 항목 저장/저장 취소 토글
 *     tags: [SavedItems]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *               - itemType
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: 저장할 항목의 ID
 *               itemType:
 *                 type: string
 *                 enum: [post, article]
 *                 description: 항목 유형 (post 또는 article)
 *     responses:
 *       200:
 *         description: 저장 상태 토글 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 isSaved:
 *                   type: boolean
 *                   description: 현재 저장 상태 (true면 저장됨, false면 저장 취소됨)
 *                 message:
 *                   type: string
 *       400:
 *         description: 유효하지 않은 요청
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: 사용자 또는 항목을 찾을 수 없음
 */
router.post('/toggle', protect, savedItemsController.toggleSavedItem);

/**
 * @swagger
 * /user/saved-items/check:
 *   get:
 *     summary: 특정 항목의 저장 여부 확인
 *     tags: [SavedItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: 확인할 항목의 ID
 *       - in: query
 *         name: itemType
 *         schema:
 *           type: string
 *           enum: [post, article]
 *         required: true
 *         description: 항목 유형 (post 또는 article)
 *     responses:
 *       200:
 *         description: 저장 여부 확인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 isSaved:
 *                   type: boolean
 *                   description: 저장 여부 (true면 저장됨, false면 저장되지 않음)
 *       400:
 *         description: 유효하지 않은 요청
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: 사용자를 찾을 수 없음
 */
router.get('/check', protect, savedItemsController.checkSavedItem);

module.exports = router;