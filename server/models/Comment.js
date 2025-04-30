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