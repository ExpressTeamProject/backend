const express = require('express');
const router = express.Router();
const { protect, checkOwnership } = require('../middleware/auth');
const Comment = require('../models/Comment');
const commentController = require('../controllers/commentController');
const upload = require('../utils/fileUpload');

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: 댓글 생성
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *               postId:
 *                 type: string
 *                 description: 문제 게시글 ID (postId 또는 articleId 중 하나 필수)
 *               articleId:
 *                 type: string
 *                 description: 커뮤니티 게시글 ID (postId 또는 articleId 중 하나 필수)
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: 첨부파일 (최대 2개)
 *     responses:
 *       201:
 *         description: 댓글 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
router.route('/')
  .post(protect, upload.commentAttachment.array('files', 2), commentController.createComment);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: 특정 댓글 가져오기
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 댓글 ID
 *     responses:
 *       200:
 *         description: 댓글 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: 댓글 수정
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 댓글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: 첨부파일 (최대 2개)
 *     responses:
 *       200:
 *         description: 댓글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: 댓글 삭제
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 댓글 ID
 *     responses:
 *       200:
 *         description: 댓글 삭제 성공
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
 *         $ref: '#/components/responses/NotFoundError'
 */
router.route('/:id')
  .get(commentController.getComment)
  .put(protect, checkOwnership(Comment), upload.commentAttachment.array('files', 2), commentController.updateComment)
  .delete(protect, checkOwnership(Comment), commentController.deleteComment);

/**
 * @swagger
 * /comments/post/{postId}:
 *   get:
 *     summary: 문제 게시글별 댓글 가져오기
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: 문제 게시글 ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: 페이지당 댓글 수
 *     responses:
 *       200:
 *         description: 게시글의 댓글 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 pagination:
 *                   type: object
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
router.get('/post/:postId', commentController.getPostComments);

/**
 * @swagger
 * /comments/article/{articleId}:
 *   get:
 *     summary: 커뮤니티 게시글별 댓글 가져오기
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: articleId
 *         schema:
 *           type: string
 *         required: true
 *         description: 커뮤니티 게시글 ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: 페이지당 댓글 수
 *     responses:
 *       200:
 *         description: 게시글의 댓글 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 pagination:
 *                   type: object
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
router.get('/article/:articleId', commentController.getArticleComments);

/**
 * @swagger
 * /comments/reply/{commentId}:
 *   post:
 *     summary: 대댓글 작성
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: 부모 댓글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: 첨부파일 (최대 2개)
 *     responses:
 *       201:
 *         description: 대댓글 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: 댓글을 찾을 수 없음
 */
router.post('/reply/:commentId', protect, upload.commentAttachment.array('files', 2), commentController.createReply);

/**
 * @swagger
 * /comments/{id}/like:
 *   put:
 *     summary: 댓글 좋아요/좋아요 취소
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 댓글 ID
 *     responses:
 *       200:
 *         description: 좋아요/좋아요 취소 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.put('/:id/like', protect, commentController.toggleLike);

/**
 * @swagger
 * /comments/{id}/attachments/{filename}:
 *   delete:
 *     summary: 댓글에서 첨부파일 삭제
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 댓글 ID
 *       - in: path
 *         name: filename
 *         schema:
 *           type: string
 *         required: true
 *         description: 삭제할 파일명
 *     responses:
 *       200:
 *         description: 첨부파일 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         description: 댓글 또는 첨부파일을 찾을 수 없음
 */
router.delete('/:id/attachments/:filename', protect, checkOwnership(Comment), commentController.removeAttachment);

module.exports = router;