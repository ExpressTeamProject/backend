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