const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect, checkOwnership } = require('../middleware/auth');
const Post = require('../models/Post');
const upload = require('../utils/fileUpload');

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: 모든 게시글 가져오기 (필터링, 정렬, 검색 포함)
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
 *         description: 카테고리 필터
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [solved, unsolved]
 *         description: 상태 필터 (해결됨/미해결)
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
 *                     $ref: '#/components/schemas/Post'
 *                 filters:
 *                   type: object
 *                   properties:
 *                     search:
 *                       type: string
 *                     category:
 *                       type: string
 *                     status:
 *                       type: string
 *                     tags:
 *                       type: array
 *                     sort:
 *                       type: string
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
 *               isSolved:
 *                 type: boolean
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
  .put(protect, checkOwnership(Post), postController.updatePost)
  .delete(protect, checkOwnership(Post), postController.deletePost);

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
 * /posts/{id}/toggle-status:
 *   put:
 *     summary: 게시글 상태 토글 (해결됨/미해결)
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
 *         description: 상태 변경 성공
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
router.route('/:id/toggle-status').put(protect, checkOwnership(Post), postController.toggleStatus);

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
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: 카테고리 필터
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [solved, unsolved]
 *         description: 상태 필터 (해결됨/미해결)
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
 *                 filters:
 *                   type: object
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
 *         description: 카테고리 필터
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [solved, unsolved]
 *         description: 상태 필터 (해결됨/미해결)
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
 *                     $ref: '#/components/schemas/Post'
 *                 filters:
 *                   type: object
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
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: ['-createdAt', 'popular', 'comments']
 *           default: '-createdAt'
 *         description: 정렬 방식 (최신순, 인기순, 댓글순)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [solved, unsolved]
 *         description: 상태 필터 (해결됨/미해결)
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
 *                     $ref: '#/components/schemas/Post'
 *                 filters:
 *                   type: object
 */
router.get('/category/:category', postController.getCategoryPosts);

/**
 * @swagger
 * /posts/categories:
 *   get:
 *     summary: 사용 가능한 카테고리 목록 가져오기
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: 카테고리 목록
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
 *                     type: string
 *                     enum: [수학, 물리학, 화학, 생물학, 컴퓨터공학, 전자공학, 기계공학, 경영학, 경제학, 심리학, 사회학, 기타]
 */
router.get('/categories', postController.getCategories);

/**
 * @swagger
 * /posts/categories/stats:
 *   get:
 *     summary: 카테고리별 통계 정보 가져오기
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: 카테고리별 게시글 통계
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
 *                       _id:
 *                         type: string
 *                         description: 카테고리명
 *                       count:
 *                         type: integer
 *                         description: 해당 카테고리 게시글 수
 *                       solvedCount:
 *                         type: integer
 *                         description: 해결된 게시글 수
 *                       unsolvedCount:
 *                         type: integer
 *                         description: 미해결 게시글 수
 */
router.get('/categories/stats', postController.getCategoryStats);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: 게시글 생성 (첨부파일 포함)
 *     description: 새로운 게시글을 생성하고 첨부파일을 업로드합니다. 최대 3개의 파일을 첨부할 수 있습니다.
 *     tags: [Posts]
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
 *               - title
 *               - content
 *               - categories
 *             properties:
 *               title:
 *                 type: string
 *                 description: 게시글 제목
 *               content:
 *                 type: string
 *                 description: 게시글 내용 (마크다운 형식 지원)
 *               categories:
 *                 type: string
 *                 description: 게시글 카테고리 (쉼표로 구분된 문자열)
 *               tags:
 *                 type: string
 *                 description: 게시글 태그 (쉼표로 구분된 문자열, 최대 5개)
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: 첨부파일 (최대 3개, 각 5MB 이하)
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
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: 잘못된 요청 (유효하지 않은 입력값)
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post(
  '/',
  protect,
  upload.postAttachment.array('files', 3), // 최대 3개까지
  postController.createPost
);

/**
 * @swagger
 * /posts/{id}/attachments:
 *   post:
 *     summary: 게시글에 첨부파일 추가
 *     description: 기존 게시글에 첨부파일을 추가합니다. 기존 첨부파일과 합쳐서 최대 3개까지 가능합니다.
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
 *     consumes:
 *       - multipart/form-data
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
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Post'
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
  checkOwnership(Post),
  upload.postAttachment.array('files', 3),
  postController.addAttachments
);

/**
 * @swagger
 * /posts/{id}/attachments/{filename}:
 *   delete:
 *     summary: 게시글에서 첨부파일 삭제
 *     description: 게시글에서 특정 첨부파일을 삭제합니다. 게시글 작성자만 삭제할 수 있습니다.
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
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Post'
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
  checkOwnership(Post),
  postController.removeAttachment
);


/**
 * @swagger
 * /posts/upload-image:
 *   post:
 *     summary: 마크다운 에디터용 이미지 업로드
 *     description: 마크다운 에디터에서 사용할 이미지를 업로드합니다.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
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
 *                 description: 업로드할 이미지 파일 (5MB 이하)
 *     responses:
 *       200:
 *         description: 이미지 업로드 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 url:
 *                   type: string
 *                   description: 업로드된 이미지의 URL
 *                   example: "/uploads/post-images/image_1234567890.jpg"
 *                 filename:
 *                   type: string
 *                   description: 서버에 저장된 파일명
 *                   example: "image_1234567890.jpg"
 *       400:
 *         description: 잘못된 요청 (이미지 누락 또는 형식 오류)
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post(
  '/upload-image',
  protect,
  upload.postImage.single('image'),
  postController.uploadImage
);

module.exports = router;