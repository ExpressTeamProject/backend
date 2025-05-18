/**
 * @swagger
 * components:
 *  schemas:
 *    Post:
 *      type: object
 *      required:
 *        - title
 *        - content
 *        - author
 *      properties:
 *        id:
 *          type: string
 *          description: 게시글 ID
 *        title:
 *          type: string
 *          description: 게시글 제목
 *        content:
 *          type: string
 *          description: 게시글 내용
 *        author:
 *          type: object
 *          description: 작성자 정보
 *          properties:
 *            id:
 *              type: string
 *              description: 작성자 ID
 *            username:
 *              type: string
 *              description: 작성자 아이디
 *            nickname:
 *              type: string
 *              description: 작성자 닉네임
 *            profileImage:
 *              type: string
 *              description: 작성자 프로필 이미지
 *        categories:
 *          type: array
 *          items:
 *            type: string
 *            enum: [수학, 물리학, 화학, 생물학, 컴퓨터공학, 전자공학, 기계공학, 경영학, 경제학, 심리학, 사회학, 기타]
 *          description: 게시글 카테고리
 *        tags:
 *          type: array
 *          items:
 *            type: string
 *          description: 게시글 태그
 *        attachments:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              filename:
 *                type: string
 *                description: 서버에 저장된 파일명
 *              originalname:
 *                type: string
 *                description: 원본 파일명
 *              path:
 *                type: string
 *                description: 파일 접근 경로
 *              mimetype:
 *                type: string
 *                description: 파일 MIME 타입
 *              size:
 *                type: integer
 *                description: 파일 크기 (바이트)
 *              uploadDate:
 *                type: string
 *                format: date-time
 *                description: 업로드 일시
 *        viewCount:
 *          type: integer
 *          description: 조회수
 *        likes:
 *          type: array
 *          items:
 *            type: string
 *          description: 좋아요한 사용자 ID 목록
 *        likeCount:
 *          type: integer
 *          description: 좋아요 수 (가상 필드)
 *        comments:
 *          type: array
 *          items:
 *            type: string
 *          description: 댓글 ID 목록
 *        commentCount:
 *          type: integer
 *          description: 댓글 수 (가상 필드)
 *        isSolved:
 *          type: boolean
 *          description: 게시글 해결 여부
 *        aiResponse:
 *          type: string
 *          description: AI가 생성한 응답
 *        aiResponseCreatedAt:
 *          type: string
 *          format: date-time
 *          description: AI 응답 생성 시간
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: 생성 시간
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          description: 수정 시간
 *      example:
 *        title: 미분방정식 문제 질문
 *        content: "다음 미분방정식의 일반해를 구하는 방법을 알려주세요: y'' - 4y' + 4y = 0"
 *        categories: [수학]
 *        author:
 *          id: 60d0fe4f5311236168a109ca
 *          username: user1
 *          nickname: 수학러버
 *          profileImage: /uploads/profile-images/default.jpg
 *        tags: [미분방정식, 수학문제]
 *        viewCount: 8
 *        likeCount: 3
 *        commentCount: 2
 *        isSolved: false
 */

// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
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
    categories: {
      type: [String],
      default: ['기타'],
      enum: ['수학', '물리학', '화학', '생물학', '컴퓨터공학', '전자공학', '기계공학', '경영학', '경제학', '심리학', '사회학', '기타']
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
    ],
    isSolved: {
      type: Boolean,
      default: false,
    },
    aiResponse: {
      type: String,
      default: null
    },
    // AI 응답 생성 시간
    aiResponseCreatedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 가상 필드: 좋아요 수
PostSchema.virtual('likeCount').get(function () {
  return this.likes.length;
});

// 가상 필드: 댓글 수
PostSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

// 인덱스 설정
PostSchema.index({ title: 'text', content: 'text' });
PostSchema.index({ categories: 1 });
PostSchema.index({ tags: 1 });
PostSchema.index({ isSolved: 1 });
PostSchema.index({ createdAt: -1 });
PostSchema.index({ author: 1 });

module.exports = mongoose.model('Post', PostSchema);