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
 *          type: string
 *          description: 작성자 ID
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
 *        imageUrl:
 *          type: string
 *          description: 이미지 URL
 *        viewCount:
 *          type: integer
 *          description: 조회수
 *        likes:
 *          type: array
 *          items:
 *            type: string
 *          description: 좋아요한 사용자 ID 목록
 *        comments:
 *          type: array
 *          items:
 *            type: string
 *          description: 댓글 ID 목록
 *        isSolved:
 *          type: boolean
 *          description: 게시글 해결 여부
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: 생성 시간
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          description: 수정 시간
 *      example:
 *        title: 첫 번째 게시글
 *        content: 안녕하세요, 이것은 테스트 게시글입니다.
 *        author: 60d0fe4f5311236168a109ca
 *        categories: [컴퓨터공학]
 *        tags: [테스트, 첫번째]
 *        viewCount: 0
 *        isSolved: false
 */

const mongoose = require('mongoose');

// 카테고리 목록 정의
const CATEGORIES = [
  '수학', 
  '물리학', 
  '화학', 
  '생물학', 
  '컴퓨터공학', 
  '전자공학', 
  '기계공학', 
  '경영학', 
  '경제학', 
  '심리학', 
  '사회학', 
  '기타'
];

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
      validate: {
        validator: function(categories) {
          // 최소 하나의 카테고리는 있어야 함
          if (categories.length === 0) {
            return false;
          }
          // 모든 카테고리가 유효한지 확인
          return categories.every(category => CATEGORIES.includes(category));
        },
        message: props => `${props.value}는 유효한 카테고리가 아닙니다. 유효한 카테고리: ${CATEGORIES.join(', ')}`
      },
      default: ['기타'],
    },
    tags: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
    },
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
    }
  },
  {
    timestamps: true,
    // 가상 필드 설정
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

// 카테고리 목록 상수 노출
PostSchema.statics.CATEGORIES = CATEGORIES;

module.exports = mongoose.model('Post', PostSchema);