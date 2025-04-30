const Post = require('../models/Post');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    모든 게시글 가져오기 (페이지네이션 포함)
// @route   GET /api/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res) => {
  // 쿼리 파라미터
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const sort = req.query.sort || '-createdAt'; // 기본값: 최신순
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // 총 게시글 수
  const total = await Post.countDocuments();

  // 게시글 조회
  const posts = await Post.find()
    .sort(sort)
    .skip(startIndex)
    .limit(limit)
    .populate({
      path: 'author',
      select: 'username nickname profileImage'
    });

  // 페이지네이션 결과
  const pagination = {};

  // 다음 페이지 정보
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  // 이전 페이지 정보
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  // 총 페이지 수
  pagination.totalPages = Math.ceil(total / limit);
  pagination.currentPage = page;

  res.status(200).json({
    success: true,
    count: posts.length,
    pagination,
    data: posts
  });
});

// @desc    특정 게시글 가져오기
// @route   GET /api/posts/:id
// @access  Public
exports.getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate({
      path: 'author',
      select: 'username nickname profileImage'
    })
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: 'username nickname profileImage'
      }
    });

  if (!post) {
    return res.status(404).json({
      success: false,
      message: '게시글을 찾을 수 없습니다'
    });
  }

  // 조회수 증가 (중복 방지 로직은 클라이언트 측에서 처리)
  post.viewCount += 1;
  await post.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    data: post
  });
});

// @desc    게시글 생성
// @route   POST /api/posts
// @access  Private
exports.createPost = asyncHandler(async (req, res) => {
  // 현재 로그인한 사용자를 작성자로 설정
  req.body.author = req.user.id;

  // 게시글 생성
  const post = await Post.create(req.body);

  res.status(201).json({
    success: true,
    data: post
  });
});

// @desc    게시글 수정
// @route   PUT /api/posts/:id
// @access  Private (소유자만)
exports.updatePost = asyncHandler(async (req, res) => {
  // req.resource는 checkOwnership 미들웨어에서 설정됨
  const post = req.resource;

  // 필드 업데이트
  Object.keys(req.body).forEach(key => {
    // author 필드는 변경 불가
    if (key !== 'author' && key !== 'likes' && key !== 'comments' && key !== 'viewCount') {
      post[key] = req.body[key];
    }
  });

  // 저장
  await post.save();

  res.status(200).json({
    success: true,
    data: post
  });
});

// @desc    게시글 삭제
// @route   DELETE /api/posts/:id
// @access  Private (소유자만)
exports.deletePost = asyncHandler(async (req, res) => {
  // req.resource는 checkOwnership 미들웨어에서 설정됨
  const post = req.resource;

  // 게시글 삭제
  await post.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    게시글 좋아요/좋아요 취소
// @route   PUT /api/posts/:id/like
// @access  Private
exports.toggleLike = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: '게시글을 찾을 수 없습니다'
    });
  }

  // 게시글 좋아요 여부 확인
  const isLiked = post.likes.includes(req.user.id);
  
  if (isLiked) {
    // 좋아요 취소
    post.likes = post.likes.filter(
      (like) => like.toString() !== req.user.id.toString()
    );
  } else {
    // 좋아요 추가
    post.likes.push(req.user.id);
  }

  await post.save();

  res.status(200).json({
    success: true,
    data: post
  });
});

// @desc    게시글 검색
// @route   GET /api/posts/search
// @access  Public
exports.searchPosts = asyncHandler(async (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      message: '검색어를 입력해주세요'
    });
  }

  const searchQuery = {
    $or: [
      { title: { $regex: q, $options: 'i' } },
      { content: { $regex: q, $options: 'i' } }
    ]
  };

  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const total = await Post.countDocuments(searchQuery);

  const posts = await Post.find(searchQuery)
    .sort('-createdAt')
    .skip(startIndex)
    .limit(parseInt(limit))
    .populate({
      path: 'author',
      select: 'username nickname'
    });

  // 페이지네이션 정보
  const pagination = {
    totalPages: Math.ceil(total / parseInt(limit)),
    currentPage: parseInt(page),
    totalResults: total
  };

  res.status(200).json({
    success: true,
    count: posts.length,
    pagination,
    data: posts
  });
});

// @desc    특정 사용자의 게시글 가져오기
// @route   GET /api/posts/user/:userId
// @access  Public
exports.getUserPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  // 사용자 확인
  const user = await User.findById(req.params.userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다'
    });
  }

  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const total = await Post.countDocuments({ author: req.params.userId });

  const posts = await Post.find({ author: req.params.userId })
    .sort('-createdAt')
    .skip(startIndex)
    .limit(parseInt(limit))
    .populate({
      path: 'author',
      select: 'username nickname profileImage'
    });

  // 페이지네이션 정보
  const pagination = {
    totalPages: Math.ceil(total / parseInt(limit)),
    currentPage: parseInt(page),
    totalResults: total
  };

  res.status(200).json({
    success: true,
    count: posts.length,
    pagination,
    data: posts
  });
});

// @desc    특정 카테고리의 게시글 가져오기
// @route   GET /api/posts/category/:category
// @access  Public
exports.getCategoryPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { category } = req.params;

  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const total = await Post.countDocuments({ categories: category });

  const posts = await Post.find({ categories: category })
    .sort('-createdAt')
    .skip(startIndex)
    .limit(parseInt(limit))
    .populate({
      path: 'author',
      select: 'username nickname profileImage'
    });

  // 페이지네이션 정보
  const pagination = {
    totalPages: Math.ceil(total / parseInt(limit)),
    currentPage: parseInt(page),
    totalResults: total
  };

  res.status(200).json({
    success: true,
    count: posts.length,
    pagination,
    data: posts
  });
});