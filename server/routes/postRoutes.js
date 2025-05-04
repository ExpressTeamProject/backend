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

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: 모든 게시글 가져오기
 *     tags: [Posts]
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
 *           default: -createdAt
 *         description: 정렬 방식 (ex. -createdAt, title)
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
 *                     $ref: '#/components/schemas/Post'
 */
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: 게시글 작성
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               imageUrl:
 *                 type: string
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
 *                   $ref: '#/components/schemas/Post'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.route('/')
  .get(postController.getPosts)
  .post(protect, postController.createPost);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: 특정 게시글 가져오기
 *     tags: [Posts]
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
 *                   $ref: '#/components/schemas/Post'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: 게시글 수정
 *     tags: [Posts]
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
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               imageUrl:
 *                 type: string
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
 *                   $ref: '#/components/schemas/Post'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: 게시글 삭제
 *     tags: [Posts]
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
  .get(postController.getPost)
  .put(protect, postController.updatePost)
  .delete(protect, postController.deletePost);

/**
 * @swagger
 * /posts/{id}/like:
 *   put:
 *     summary: 게시글 좋아요/좋아요 취소
 *     tags: [Posts]
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
 *                   $ref: '#/components/schemas/Post'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.route('/:id/like').put(protect, postController.toggleLike);

/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: 게시글 검색
 *     tags: [Posts]
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
 *                   properties:
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     totalResults:
 *                       type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *       400:
 *         description: 검색어가 없음
 */
router.get('/search', postController.searchPosts);

/**
 * @swagger
 * /posts/user/{userId}:
 *   get:
 *     summary: 특정 사용자의 게시글 가져오기
 *     tags: [Posts]
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
 *                     $ref: '#/components/schemas/Post'
 *       404:
 *         description: 사용자를 찾을 수 없음
 */
router.get('/user/:userId', postController.getUserPosts);

/**
 * @swagger
 * /posts/category/{category}:
 *   get:
 *     summary: 특정 카테고리의 게시글 가져오기
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
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
 *                     $ref: '#/components/schemas/Post'
 */
router.get('/category/:category', postController.getCategoryPosts);

module.exports = router;