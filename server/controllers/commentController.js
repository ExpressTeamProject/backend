const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    댓글 생성
// @route   POST /api/comments
// @access  Private
exports.createComment = asyncHandler(async (req, res) => {
  const { content, postId } = req.body;

  // 게시글 존재 여부 확인
  const post = await Post.findById(postId);
  
  if (!post) {
    return res.status(404).json({
      success: false,
      message: '게시글을 찾을 수 없습니다'
    });
  }

  // 댓글 생성
  const comment = await Comment.create({
    content,
    author: req.user.id,
    post: postId
  });

  // 게시글에 댓글 ID 추가
  post.comments.push(comment._id);
  await post.save();

  // author 정보 채우기
  await comment.populate({
    path: 'author',
    select: 'username nickname profileImage'
  });

  res.status(201).json({
    success: true,
    data: comment
  });
});

// @desc    특정 댓글 가져오기
// @route   GET /api/comments/:id
// @access  Public
exports.getComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id)
    .populate({
      path: 'author',
      select: 'username nickname profileImage'
    })
    .populate({
      path: 'replies',
      populate: {
        path: 'author',
        select: 'username nickname profileImage'
      }
    });

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: '댓글을 찾을 수 없습니다'
    });
  }

  res.status(200).json({
    success: true,
    data: comment
  });
});

// @desc    댓글 수정
// @route   PUT /api/comments/:id
// @access  Private (소유자만)
exports.updateComment = asyncHandler(async (req, res) => {
  // req.resource는 checkOwnership 미들웨어에서 설정됨
  const comment = req.resource;

  // 내용 업데이트
  comment.content = req.body.content;

  // 저장
  await comment.save();

  res.status(200).json({
    success: true,
    data: comment
  });
});

// @desc    댓글 삭제
// @route   DELETE /api/comments/:id
// @access  Private (소유자만)
exports.deleteComment = asyncHandler(async (req, res) => {
  // req.resource는 checkOwnership 미들웨어에서 설정됨
  const comment = req.resource;

  // 실제로 삭제하지 않고 isDeleted 플래그 설정 (대댓글이 있을 수 있으므로)
  comment.isDeleted = true;
  comment.content = '삭제된 댓글입니다';
  await comment.save();

  // 게시글에서 댓글 ID 제거
  const post = await Post.findById(comment.post);
  if (post) {
    post.comments = post.comments.filter(
      (id) => id.toString() !== comment._id.toString()
    );
    await post.save();
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    게시글별 댓글 가져오기
// @route   GET /api/comments/post/:postId
// @access  Public
exports.getPostComments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  // 게시글 존재 여부 확인
  const post = await Post.findById(req.params.postId);
  
  if (!post) {
    return res.status(404).json({
      success: false,
      message: '게시글을 찾을 수 없습니다'
    });
  }

  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const total = await Comment.countDocuments({ 
    post: req.params.postId,
    parent: null // 최상위 댓글만 계산
  });

  // 최상위 댓글만 가져오기
  const comments = await Comment.find({ 
    post: req.params.postId,
    parent: null
  })
    .sort('createdAt')
    .skip(startIndex)
    .limit(parseInt(limit))
    .populate({
      path: 'author',
      select: 'username nickname profileImage'
    })
    .populate({
      path: 'replies',
      populate: {
        path: 'author',
        select: 'username nickname profileImage'
      }
    });

  // 페이지네이션 정보
  const pagination = {
    totalPages: Math.ceil(total / parseInt(limit)),
    currentPage: parseInt(page),
    totalResults: total
  };

  res.status(200).json({
    success: true,
    count: comments.length,
    pagination,
    data: comments
  });
});

// @desc    대댓글 작성
// @route   POST /api/comments/reply/:commentId
// @access  Private
exports.createReply = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { commentId } = req.params;

  // 원본 댓글 확인
  const parentComment = await Comment.findById(commentId);
  
  if (!parentComment) {
    return res.status(404).json({
      success: false,
      message: '댓글을 찾을 수 없습니다'
    });
  }

  // 대댓글 생성
  const reply = await Comment.create({
    content,
    author: req.user.id,
    post: parentComment.post,
    parent: commentId
  });

  // 게시글에 댓글 ID 추가
  const post = await Post.findById(parentComment.post);
  post.comments.push(reply._id);
  await post.save();

  // author 정보 채우기
  await reply.populate({
    path: 'author',
    select: 'username nickname profileImage'
  });

  res.status(201).json({
    success: true,
    data: reply
  });
});

// @desc    댓글 좋아요/좋아요 취소
// @route   PUT /api/comments/:id/like
// @access  Private
exports.toggleLike = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: '댓글을 찾을 수 없습니다'
    });
  }

  // 좋아요 여부 확인
  const isLiked = comment.likes.includes(req.user.id);
  
  if (isLiked) {
    // 좋아요 취소
    comment.likes = comment.likes.filter(
      (like) => like.toString() !== req.user.id.toString()
    );
  } else {
    // 좋아요 추가
    comment.likes.push(req.user.id);
  }

  await comment.save();

  res.status(200).json({
    success: true,
    data: comment
  });
});