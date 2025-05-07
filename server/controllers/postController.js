const Post = require('../models/Post');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');
const Comment = require('../models/Comment');

// @desc    모든 게시글 가져오기 (필터링, 정렬, 검색 포함)
// @route   GET /api/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res) => {
  // 쿼리 파라미터
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  
  // 검색어
  const searchQuery = req.query.search;
  
  // 정렬 옵션 (최신순, 인기순, 댓글순)
  let sortOption = req.query.sort || '-createdAt'; // 기본값: 최신순
  if (sortOption === 'popular') {
    sortOption = '-likeCount'; // 인기순 (좋아요 수)
  } else if (sortOption === 'comments') {
    sortOption = '-commentCount'; // 댓글순
  }
  
  // 필터링 옵션
  const category = req.query.category; // 카테고리 필터
  const status = req.query.status; // 상태 필터 (해결됨/미해결)
  const tags = req.query.tags ? req.query.tags.split(',') : null; // 태그 필터 (쉼표로 구분)
  
  // 필터 쿼리 생성
  const filterQuery = {};
  
  // 검색어 필터 (제목 + 내용)
  if (searchQuery) {
    filterQuery.$or = [
      { title: { $regex: searchQuery, $options: 'i' } },
      { content: { $regex: searchQuery, $options: 'i' } }
    ];
  }
  
  // 카테고리 필터
  if (category) {
    filterQuery.categories = category;
  }
  
  // 상태 필터
  if (status === 'solved') {
    filterQuery.isSolved = true;
  } else if (status === 'unsolved') {
    filterQuery.isSolved = false;
  }
  
  // 태그 필터
  if (tags) {
    filterQuery.tags = { $in: tags };
  }
  
  // 총 게시글 수 (필터 적용)
  const total = await Post.countDocuments(filterQuery);
  
  // 게시글 조회 (필터 및 정렬 적용)
  const posts = await Post.find(filterQuery)
    .sort(sortOption)
    .skip(startIndex)
    .limit(limit)
    .populate({
      path: 'author',
      select: 'username nickname profileImage'
    });
  
  // 페이지네이션 결과
  const pagination = {};
  
  // 다음 페이지 정보
  if (startIndex + posts.length < total) {
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
  pagination.totalResults = total;
  
  res.status(200).json({
    success: true,
    count: posts.length,
    pagination,
    data: posts,
    filters: {
      search: searchQuery || null,
      category: category || null,
      status: status || null,
      tags: tags || null,
      sort: req.query.sort || 'latest'
    }
  });
});

// @desc    특정 게시글 가져오기
// @route   GET /api/posts/:id
// @access  Public
exports.getPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate({
        path: 'author',
        select: 'username nickname profileImage'
      });
    
    // 먼저 게시글만 가져오고
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '게시글을 찾을 수 없습니다'
      });
    }
    
    // 필요한 경우 별도로 댓글 조회
    if (post.comments && post.comments.length > 0) {
      await post.populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username nickname profileImage'
        }
      });
    }

    // 조회수 증가
    post.viewCount += 1;
    await post.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('게시글 조회 에러:', error);
    res.status(500).json({
      success: false,
      message: '게시글 조회 중 오류가 발생했습니다',
      error: error.message
    });
  }
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
  const { q, page = 1, limit = 10, category, status, tags, sort = '-createdAt' } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      message: '검색어를 입력해주세요'
    });
  }

  // 검색 쿼리 생성
  const searchQuery = {
    $or: [
      { title: { $regex: q, $options: 'i' } },
      { content: { $regex: q, $options: 'i' } }
    ]
  };
  
  // 카테고리 필터
  if (req.query.categories) {
    const categoriesArray = req.query.categories.split(',');

    searchQuery.categories = { $in: categoriesArray };
  }
  
  // 상태 필터
  if (status === 'solved') {
    searchQuery.isSolved = true;
  } else if (status === 'unsolved') {
    searchQuery.isSolved = false;
  }
  
  // 태그 필터
  if (tags) {
    const tagArray = tags.split(',');
    searchQuery.tags = { $in: tagArray };
  }

  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const total = await Post.countDocuments(searchQuery);
  
  // 정렬 옵션
  let sortOption = sort;
  if (sort === 'popular') {
    sortOption = '-likeCount';
  } else if (sort === 'comments') {
    sortOption = '-commentCount';
  }

  const posts = await Post.find(searchQuery)
    .select('title content author categories tags createdAt updatedAt viewCount likes isSolved')
    .sort(sortOption)
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
    data: posts,
    filters: {
      search: q,
      category: category || null,
      status: status || null,
      tags: tags ? tags.split(',') : null,
      sort: sort
    }
  });
});

// @desc    특정 사용자의 게시글 가져오기
// @route   GET /api/posts/user/:userId
// @access  Public
exports.getUserPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt', status, category, tags } = req.query;

  // 사용자 확인
  const user = await User.findById(req.params.userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다'
    });
  }
  
  // 필터 쿼리 생성
  const filterQuery = { author: req.params.userId };
  
  // 카테고리 필터
  if (category) {
    filterQuery.categories = category;
  }
  
  // 상태 필터
  if (status === 'solved') {
    filterQuery.isSolved = true;
  } else if (status === 'unsolved') {
    filterQuery.isSolved = false;
  }
  
  // 태그 필터
  if (tags) {
    const tagArray = tags.split(',');
    filterQuery.tags = { $in: tagArray };
  }

  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const total = await Post.countDocuments(filterQuery);
  
  // 정렬 옵션
  let sortOption = sort;
  if (sort === 'popular') {
    sortOption = '-likeCount';
  } else if (sort === 'comments') {
    sortOption = '-commentCount';
  }

  const posts = await Post.find(filterQuery)
    .sort(sortOption)
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
    data: posts,
    filters: {
      category: category || null,
      status: status || null,
      tags: tags ? tags.split(',') : null,
      sort: sort
    }
  });
});

// @desc    특정 카테고리의 게시글 가져오기
// @route   GET /api/posts/category/:category
// @access  Public
exports.getCategoryPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt', status, tags, search } = req.query;
  const { category } = req.params;
  
  // 필터 쿼리 생성
  const filterQuery = { categories: category };
  
  // 검색어 필터
  if (search) {
    filterQuery.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ];
  }
  
  // 상태 필터
  if (status === 'solved') {
    filterQuery.isSolved = true;
  } else if (status === 'unsolved') {
    filterQuery.isSolved = false;
  }
  
  // 태그 필터
  if (tags) {
    const tagArray = tags.split(',');
    filterQuery.tags = { $in: tagArray };
  }

  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const total = await Post.countDocuments(filterQuery);
  
  // 정렬 옵션
  let sortOption = sort;
  if (sort === 'popular') {
    sortOption = '-likeCount';
  } else if (sort === 'comments') {
    sortOption = '-commentCount';
  }

  const posts = await Post.find(filterQuery)
    .sort(sortOption)
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
    data: posts,
    filters: {
      category,
      search: search || null,
      status: status || null,
      tags: tags ? tags.split(',') : null,
      sort: sort
    }
  });
});

// @desc    게시글 상태 토글(해결됨/미해결)
// @route   PUT /api/posts/:id/toggle-status
// @access  Private (소유자만)
exports.toggleStatus = asyncHandler(async (req, res) => {
  // req.resource는 checkOwnership 미들웨어에서 설정됨
  const post = req.resource;

  // 상태 토글
  post.isSolved = !post.isSolved;
  
  // 저장
  await post.save();

  res.status(200).json({
    success: true,
    data: post
  });
});

// @desc    사용 가능한 카테고리 목록 가져오기
// @route   GET /api/posts/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  // Post 모델에서 정의한 카테고리 목록 가져오기
  const categories = Post.CATEGORIES;
  
  res.status(200).json({
    success: true,
    data: categories
  });
});

// @desc    카테고리별 통계 조회 (각 카테고리별 게시글 수)
// @route   GET /api/posts/categories/stats
// @access  Public
exports.getCategoryStats = asyncHandler(async (req, res) => {
  const stats = await Post.aggregate([
    { $unwind: '$categories' },
    {
      $group: {
        _id: '$categories',
        count: { $sum: 1 },
        solvedCount: {
          $sum: { $cond: [{ $eq: ['$isSolved', true] }, 1, 0] }
        },
        unsolvedCount: {
          $sum: { $cond: [{ $eq: ['$isSolved', false] }, 1, 0] }
        }
      }
    },
    { $sort: { count: -1 } }
  ]);
  
  // 모든 카테고리 포함시키기 (게시글이 없는 카테고리도 표시)
  const allCategories = Post.CATEGORIES.map(category => {
    const found = stats.find(s => s._id === category);
    if (found) {
      return found;
    }
    return {
      _id: category,
      count: 0,
      solvedCount: 0,
      unsolvedCount: 0
    };
  });
  
  res.status(200).json({
    success: true,
    data: allCategories
  });
});