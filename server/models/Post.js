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
 *        categories: [일반]
 *        tags: [테스트, 첫번째]
 *        viewCount: 0
 */

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
      default: ['일반'],
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

module.exports = mongoose.model('Post', PostSchema);