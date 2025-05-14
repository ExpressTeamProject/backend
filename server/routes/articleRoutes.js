const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { protect, checkOwnership } = require('../middleware/auth');
const Article = require('../models/Article');
const upload = require('../utils/fileUpload');

/**
 * @swagger
 * tags:
 *   - name: Articles
 *     description: 커뮤니티 게시글 관련 API
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: 모든 커뮤니티 게시글 가져오기 (필터링, 정렬, 검색 포함)
 *     tags: [Articles]
 *     parameters:
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
 *           default: 10
 *         description: 페이지당 게시글 수
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: ['-createdAt', 'popular', 'comments']
 *           default: '-createdAt'
 *         description: 정렬 방식 (최신순, 인기순, 댓글순)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 검색어 (제목과 내용에서 검색)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [질문, 정보, 모집, 후기, 기타]
 *         description: 카테고리 필터
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: 태그 필터 (쉼표로 구분)
 *     responses:
 *       200:
 *         description: 게시글 목록
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
 *                     $ref: '#/components/schemas/Article'
 *                 filters:
 *                   type: object
 */
/**
 * @swagger
 * /articles:
 *   post:
 *     summary: 커뮤니티 게시글 작성
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 description: 게시글 제목
 *               content:
 *                 type: string
 *                 description: 게시글 내용
 *               category:
 *                 type: string
 *                 enum: [질문, 정보, 모집, 후기, 기타]
 *                 description: 게시글 카테고리
 *               tags:
 *                 type: string
 *                 description: 게시글 태그 (쉼표로 구분된 문자열)
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: 첨부파일 (최대 3개)
 *     responses:
 *       201:
 *         description: 게시글 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Article'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.route('/')
  .get(articleController.getArticles)
  .post(protect, upload.articleAttachment.array('files', 3), articleController.createArticle);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: 특정 게시글 가져오기
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 게시글 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Article'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
/**
 * @swagger
 * /articles/{id}:
 *   put:
 *     summary: 커뮤니티 게시글 수정
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 게시글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [질문, 정보, 모집, 후기, 기타]
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: 게시글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Article'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: 커뮤니티 게시글 삭제
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 게시글 삭제 성공
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
  .get(articleController.getArticle)
  .put(protect, checkOwnership(Article), articleController.updateArticle)
  .delete(protect, checkOwnership(Article), articleController.deleteArticle);

/**
 * @swagger
 * /articles/{id}/like:
 *   put:
 *     summary: 커뮤니티 게시글 좋아요/좋아요 취소
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 게시글 ID
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
 *                   $ref: '#/components/schemas/Article'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.put('/:id/like', protect, articleController.toggleLike);

/**
 * @swagger
 * /articles/search:
 *   get:
 *     summary: 커뮤니티 게시글 검색
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: 검색어
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
 *           default: 10
 *         description: 페이지당 게시글 수
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [질문, 정보, 모집, 후기, 기타]
 *         description: 카테고리 필터
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: 태그 필터 (쉼표로 구분)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: ['-createdAt', 'popular', 'comments']
 *           default: '-createdAt'
 *         description: 정렬 방식 (최신순, 인기순, 댓글순)
 *     responses:
 *       200:
 *         description: 검색 결과
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
 *                     $ref: '#/components/schemas/Article'
 *                 filters:
 *                   type: object
 *       400:
 *         description: 검색어가 없음
 */
router.get('/search', articleController.searchArticles);

/**
 * @swagger
 * /articles/user/{userId}:
 *   get:
 *     summary: 특정 사용자의 커뮤니티 게시글 가져오기
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: 사용자 ID
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
 *           default: 10
 *         description: 페이지당 게시글 수
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: ['-createdAt', 'popular', 'comments']
 *           default: '-createdAt'
 *         description: 정렬 방식 (최신순, 인기순, 댓글순)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [질문, 정보, 모집, 후기, 기타]
 *         description: 카테고리 필터
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: 태그 필터 (쉼표로 구분)
 *     responses:
 *       200:
 *         description: 사용자의 게시글 목록
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
 *                     $ref: '#/components/schemas/Article'
 *                 filters:
 *                   type: object
 *       404:
 *         description: 사용자를 찾을 수 없음
 */
router.get('/user/:userId', articleController.getUserArticles);

/**
 * @swagger
 * /articles/category/{category}:
 *   get:
 *     summary: 특정 카테고리의 커뮤니티 게시글 가져오기
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *           enum: [질문, 정보, 모집, 후기, 기타]
 *         required: true
 *         description: 카테고리명
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
 *           default: 10
 *         description: 페이지당 게시글 수
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: ['-createdAt', 'popular', 'comments']
 *           default: '-createdAt'
 *         description: 정렬 방식 (최신순, 인기순, 댓글순)
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: 태그 필터 (쉼표로 구분)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 카테고리 내 검색어
 *     responses:
 *       200:
 *         description: 카테고리별 게시글 목록
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
 *                     $ref: '#/components/schemas/Article'
 *                 filters:
 *                   type: object
 */
router.get('/category/:category', articleController.getCategoryArticles);

/**
 * @swagger
 * /articles/popular-tags:
 *   get:
 *     summary: 인기 태그 목록 가져오기
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: 인기 태그 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       tag:
 *                         type: string
 *                       count:
 *                         type: integer
 */
router.get('/popular-tags', articleController.getPopularTags);

/**
 * @swagger
 * /articles/{id}/attachments:
 *   post:
 *     summary: 게시글에 첨부파일 추가
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 게시글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - files
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: 첨부파일 (최대 3개, 각 5MB 이하)
 *     responses:
 *       200:
 *         description: 첨부파일 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Article'
 *       400:
 *         description: 잘못된 요청 (파일 없음 또는 첨부파일 제한 초과)
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.post(
  '/:id/attachments',
  protect,
  checkOwnership(Article),
  upload.articleAttachment.array('files', 3),
  articleController.addAttachments
);

/**
 * @swagger
 * /articles/{id}/attachments/{filename}:
 *   delete:
 *     summary: 게시글에서 첨부파일 삭제
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 게시글 ID
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
 *                   $ref: '#/components/schemas/Article'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         description: 게시글 또는 첨부파일을 찾을 수 없음
 */
router.delete(
  '/:id/attachments/:filename',
  protect,
  checkOwnership(Article),
  articleController.removeAttachment
);

module.exports = router;