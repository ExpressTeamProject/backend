
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const Article = require('../models/Article');
const { asyncHandler } = require('../middleware/errorHandler');
const path = require('path');
const fs = require('fs').promises;

// @desc    댓글 생성
// @route   POST /api/comments
// @access  Private
exports.createComment = asyncHandler(async (req, res) => {
  const { content, postId, articleId } = req.body;

  // 게시글 타입 확인 및 존재 여부 확인
  let targetModel, targetId, targetField;
  
  if (postId) {
    targetModel = Post;
    targetId = postId;
    targetField = 'post';
  } else if (articleId) {
    targetModel = Article;
    targetId = articleId;
    targetField = 'article';
  } else {
    return res.status(400).json({
      success: false,
      message: '게시글 ID(postId) 또는 커뮤니티 게시글 ID(articleId)가 필요합니다'
    });
  }
  
  // 대상 게시글 찾기
  const target = await targetModel.findById(targetId);
  
  if (!target) {
    return res.status(404).json({
      success: false,
      message: '게시글을 찾을 수 없습니다'
    });
  }

  // 첨부파일 정보 가져오기
  const attachments = req.files ? req.files.map(file => ({
    filename: file.filename,
    originalname: file.originalname,
    path: `/uploads/comment-attachments/${file.filename}`,
    mimetype: file.mimetype,
    size: file.size
  })) : [];

  // 댓글 생성 (동적으로 필드 설정)
  const commentData = {
    content,
    author: req.user.id,
    attachments
  };
  
  // 동적으로 필드 추가 (post 또는 article)
  commentData[targetField] = targetId;
  
  const comment = await Comment.create(commentData);

  // 게시글에 댓글 ID 추가
  target.comments.push(comment._id);
  await target.save();

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

  // 새 첨부파일 처리
  if (req.files && req.files.length > 0) {
    // 첨부파일 개수 제한 (최대 2개)
    if ((comment.attachments?.length || 0) + req.files.length > 2) {
      return res.status(400).json({
        success: false,
        message: '댓글 첨부파일은 최대 2개까지 업로드할 수 있습니다'
      });
    }
    
    // 새 첨부파일 정보 추가
    const newAttachments = req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      path: `/uploads/comment-attachments/${file.filename}`,
      mimetype: file.mimetype,
      size: file.size
    }));
    
    // 기존 첨부파일 배열에 새 파일 추가
    comment.attachments = [...(comment.attachments || []), ...newAttachments];
  }

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

  // 첨부파일이 있다면 삭제
  if (comment.attachments && comment.attachments.length > 0) {
    for (const attachment of comment.attachments) {
      try {
        const filePath = path.join(__dirname, '..', 'uploads/comment-attachments', path.basename(attachment.filename));
        await fs.unlink(filePath);
      } catch (error) {
        console.error('파일 삭제 실패:', error.message);
        // 파일 삭제 실패해도 계속 진행
      }
    }
  }

  // 실제로 삭제하지 않고 isDeleted 플래그 설정 (대댓글이 있을 수 있으므로)
  comment.isDeleted = true;
  comment.content = '삭제된 댓글입니다';
  comment.attachments = []; // 첨부파일 정보도 제거
  await comment.save();

  // 게시글에서 댓글 ID 제거
  if (comment.post) {
    const post = await Post.findById(comment.post);
    if (post) {
      post.comments = post.comments.filter(
        (id) => id.toString() !== comment._id.toString()
      );
      await post.save();
    }
  } else if (comment.article) {
    const article = await Article.findById(comment.article);
    if (article) {
      article.comments = article.comments.filter(
        (id) => id.toString() !== comment._id.toString()
      );
      await article.save();
    }
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

// @desc    커뮤니티 게시글별 댓글 가져오기
// @route   GET /api/comments/article/:articleId
// @access  Public
exports.getArticleComments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  // 게시글 존재 여부 확인
  const article = await Article.findById(req.params.articleId);
  
  if (!article) {
    return res.status(404).json({
      success: false,
      message: '게시글을 찾을 수 없습니다'
    });
  }

  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const total = await Comment.countDocuments({ 
    article: req.params.articleId,
    parent: null // 최상위 댓글만 계산
  });

  // 최상위 댓글만 가져오기
  const comments = await Comment.find({ 
    article: req.params.articleId,
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

  // 첨부파일 정보 가져오기
  const attachments = req.files ? req.files.map(file => ({
    filename: file.filename,
    originalname: file.originalname,
    path: `/uploads/comment-attachments/${file.filename}`,
    mimetype: file.mimetype,
    size: file.size
  })) : [];

  // 대댓글 생성 - 부모 댓글이 속한 게시글 타입에 따라 필드 설정
  const replyData = {
    content,
    author: req.user.id,
    parent: commentId,
    attachments
  };

  // 부모 댓글이 속한 게시글 타입에 따라 필드 설정
  if (parentComment.post) {
    replyData.post = parentComment.post;
  } else if (parentComment.article) {
    replyData.article = parentComment.article;
  }

  const reply = await Comment.create(replyData);

  // 대상 게시글 찾기 및 댓글 ID 추가
  let target;
  if (parentComment.post) {
    target = await Post.findById(parentComment.post);
  } else if (parentComment.article) {
    target = await Article.findById(parentComment.article);
  }

  if (target) {
    target.comments.push(reply._id);
    await target.save();
  }

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

// @desc    댓글 첨부파일 삭제
// @route   DELETE /api/comments/:id/attachments/:filename
// @access  Private (소유자만)
exports.removeAttachment = asyncHandler(async (req, res) => {
  // req.resource는 checkOwnership 미들웨어에서 설정됨
  const comment = req.resource;
  const filename = req.params.filename;
  
  // 해당 첨부파일 찾기
  const attachmentIndex = comment.attachments.findIndex(att => att.filename === filename);
  
  if (attachmentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: '첨부파일을 찾을 수 없습니다'
    });
  }
  
  // 파일 시스템에서 파일 삭제
  try {
    const filePath = path.join(process.cwd(), 'uploads/comment-attachments', filename);
    await fs.unlink(filePath);
  } catch (error) {
    console.error('파일 삭제 실패:', error);
    // 파일이 없더라도 DB에서는 삭제 계속 진행
  }
  
  // 배열에서 첨부파일 제거
  comment.attachments.splice(attachmentIndex, 1);
  await comment.save();
  
  res.status(200).json({
    success: true,
    data: comment
  });
});