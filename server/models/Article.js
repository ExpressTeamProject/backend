const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: 게시글 ID
 *         title:
 *           type: string
 *           description: 게시글 제목
 *         content:
 *           type: string
 *           description: 게시글 내용
 *         author:
 *           type: object
 *           description: 작성자 정보
 *           properties:
 *             id:
 *               type: string
 *               description: 작성자 ID
 *             username:
 *               type: string
 *               description: 작성자 아이디
 *             nickname:
 *               type: string
 *               description: 작성자 닉네임
 *             profileImage:
 *               type: string
 *               description: 작성자 프로필 이미지
 *         category:
 *           type: string
 *           enum: [질문, 정보, 모집, 후기, 기타]
 *           description: 게시글 카테고리
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: 게시글 태그
 *         attachments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               filename:
 *                 type: string
 *                 description: 서버에 저장된 파일명
 *               originalname:
 *                 type: string
 *                 description: 원본 파일명
 *               path:
 *                 type: string
 *                 description: 파일 접근 경로
 *               mimetype:
 *                 type: string
 *                 description: 파일 MIME 타입
 *               size:
 *                 type: integer
 *                 description: 파일 크기 (바이트)
 *               uploadDate:
 *                 type: string
 *                 format: date-time
 *                 description: 업로드 일시
 *         viewCount:
 *           type: integer
 *           description: 조회수
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *           description: 좋아요한 사용자 ID 목록
 *         likeCount:
 *           type: integer
 *           description: 좋아요 수 (가상 필드)
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *           description: 댓글 ID 목록
 *         commentCount:
 *           type: integer
 *           description: 댓글 수 (가상 필드)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성 시간
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 수정 시간
 *       example:
 *         title: 미분방정식 공부 방법 추천해주세요
 *         content: 미분방정식을 독학하고 있는데 좋은 교재나 온라인 강의 추천 부탁드립니다.
 *         category: 질문
 *         author:
 *           id: 60d0fe4f5311236168a109ca
 *           username: user1
 *           nickname: 수학러버
 *           profileImage: /uploads/profile-images/default.jpg
 *         tags: [수학, 미분방정식, 독학]
 *         viewCount: 8
 *         likeCount: 5
 *         commentCount: 3
 */

/**
 * 커뮤니티 게시글(Article) 모델
 * Post 모델과 별도로 관리되는 커뮤니티 게시글을 위한 스키마
 */
const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '제목은 필수입니다'],
      trim: true,
      maxlength: [100, '제목은 최대 100자까지 가능합니다'],
    },
    content: {
      type: String,
      required: [true, '내용은 필수입니다'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      enum: ['질문', '정보', '모집', '후기', '기타'],
      default: '기타',
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function(tags) {
          return tags.length <= 5; // 최대 5개 태그 제한
        },
        message: '태그는 최대 5개까지 추가할 수 있습니다'
      }
    },
    attachments: [{
      filename: {
        type: String,
        required: true
      },
      originalname: {
        type: String,
        required: true
      },
      path: {
        type: String,
        required: true
      },
      mimetype: {
        type: String,
        required: true
      },
      size: {
        type: Number,
        required: true
      },
      uploadDate: {
        type: Date,
        default: Date.now
      }
    }],
    viewCount: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 가상 필드: 좋아요 수
ArticleSchema.virtual('likeCount').get(function () {
  return this.likes.length;
});

// 가상 필드: 댓글 수
ArticleSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

// 인덱스 설정
ArticleSchema.index({ title: 'text', content: 'text' });
ArticleSchema.index({ category: 1 });
ArticleSchema.index({ tags: 1 });
ArticleSchema.index({ createdAt: -1 });
ArticleSchema.index({ author: 1 });

module.exports = mongoose.model('Article', ArticleSchema);