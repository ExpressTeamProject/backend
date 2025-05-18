/**
 * @swagger
 * components:
 *  schemas:
 *    Comment:
 *      type: object
 *      required:
 *        - content
 *        - author
 *      properties:
 *        id:
 *          type: string
 *          description: 댓글 ID
 *        content:
 *          type: string
 *          description: 댓글 내용
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
 *        post:
 *          type: string
 *          description: 연결된 문제 게시글 ID (post 또는 article 중 하나만 설정)
 *        article:
 *          type: string
 *          description: 연결된 커뮤니티 게시글 ID (post 또는 article 중 하나만 설정)
 *        parent:
 *          type: string
 *          description: 부모 댓글 ID (대댓글인 경우)
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
 *        likes:
 *          type: array
 *          items:
 *            type: string
 *          description: 좋아요한 사용자 ID 목록
 *        likeCount:
 *          type: integer
 *          description: 좋아요 수 (가상 필드)
 *        isDeleted:
 *          type: boolean
 *          description: 삭제 여부
 *        isAIGenerated:
 *          type: boolean
 *          description: AI가 생성한 댓글인지 여부
 *        replies:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Comment'
 *          description: 대댓글 목록 (가상 필드)
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
 *        author:
 *          id: 60d0fe4f5311236168a109ca
 *          username: user1
 *          nickname: 수학러버
 *          profileImage: /uploads/profile-images/default.jpg
 *        post: 60d0fe4f5311236168a109cb
 *        likes: []
 *        isDeleted: false
 *        likeCount: 0
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
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null, // 대댓글인 경우 상위 댓글의 ID가 저장됨
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
    // AI가 생성한 댓글인지 여부
    isAIGenerated: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 유효성 검사
// post나 article 중 하나는 반드시 있어야 함
CommentSchema.pre('validate', function(next) {
  if (!this.post && !this.article) {
    next(new Error('댓글은 post 또는 article에 속해야 합니다.'));
  } else {
    next();
  }
});

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

// 인덱스 설정
CommentSchema.index({ post: 1 });
CommentSchema.index({ parent: 1 });
CommentSchema.index({ author: 1 });
CommentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Comment', CommentSchema);