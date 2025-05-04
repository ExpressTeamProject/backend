/**
 * @swagger
 * components:
 *  schemas:
 *    Comment:
 *      type: object
 *      required:
 *        - content
 *        - author
 *        - post
 *      properties:
 *        id:
 *          type: string
 *          description: 댓글 ID
 *        content:
 *          type: string
 *          description: 댓글 내용
 *        author:
 *          type: string
 *          description: 작성자 ID
 *        post:
 *          type: string
 *          description: 게시글 ID
 *        parent:
 *          type: string
 *          description: 부모 댓글 ID (대댓글인 경우)
 *        likes:
 *          type: array
 *          items:
 *            type: string
 *          description: 좋아요한 사용자 ID 목록
 *        isDeleted:
 *          type: boolean
 *          description: 삭제 여부
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: 생성 시간
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          description: 수정 시간
 *      example:
 *        content: 좋은 게시글입니다!
 *        author: 60d0fe4f5311236168a109ca
 *        post: 60d0fe4f5311236168a109cb
 *        likes: []
 *        isDeleted: false
 */

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, '댓글 내용은 필수입니다'],
      trim: true,
      maxlength: [500, '댓글은 최대 500자까지 가능합니다'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null, // 대댓글인 경우 상위 댓글의 ID가 저장됨
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 가상 필드: 좋아요 수
CommentSchema.virtual('likeCount').get(function () {
  return this.likes.length;
});

// 대댓글을 가져오는 가상 필드
CommentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent',
});

module.exports = mongoose.model('Comment', CommentSchema);