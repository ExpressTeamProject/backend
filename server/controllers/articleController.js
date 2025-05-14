const Article = require('../models/Article');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');
const Comment = require('../models/Comment');
const path = require('path');
const fs = require('fs').promises;

// @desc    모든 커뮤니티 게시글 가져오기 (필터링, 정렬, 검색 포함)
// @route   GET /api/articles
// @access  Public
exports.getArticles = asyncHandler(async (req, res) => {
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
    filterQuery.category = category;
  }
  
  // 태그 필터
  if (tags) {
    filterQuery.tags = { $in: tags };
  }
  
  // 총 게시글 수 (필터 적용)
  const total = await Article.countDocuments(filterQuery);
  
  // 게시글 조회 (필터 및 정렬 적용)
  const articles = await Article.find(filterQuery)
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
  if (startIndex + articles.length < total) {
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
    count: articles.length,
    pagination,
    data: articles,
    filters: {
      search: searchQuery || null,
      category: category || null,
      tags: tags || null,
      sort: req.query.sort || 'latest'
    }
  });
});

// @desc    특정 커뮤니티 게시글 가져오기
// @route   GET /api/articles/:id
// @access  Public
exports.getArticle = asyncHandler(async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate({
        path: 'author',
        select: 'username nickname profileImage'
      });
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: '게시글을 찾을 수 없습니다'
      });
    }
    
    // 필요한 경우 별도로 댓글 조회
    if (article.comments && article.comments.length > 0) {
      await article.populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username nickname profileImage'
        }
      });
    }
    
    // 조회수 증가
    article.viewCount += 1;
    await article.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      data: article
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

// @desc    커뮤니티 게시글 생성
// @route   POST /api/articles
// @access  Private
exports.createArticle = asyncHandler(async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    
    // 태그가 배열이 아니라면 배열로 변환
    const tagsArray = Array.isArray(tags) 
      ? tags 
      : tags ? tags.split(',').map(t => t.trim()) : [];
    
    // 첨부파일 정보 가져오기
    const attachments = req.files ? req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      path: `/uploads/article-attachments/${file.filename}`,
      mimetype: file.mimetype,
      size: file.size
    })) : [];
    
    // 게시글 생성
    const article = await Article.create({
      title,
      content,
      author: req.user.id,
      category,
      tags: tagsArray,
      attachments
    });

    // 게시글 생성 성공 응답
    res.status(201).json({
      success: true,
      data: article
    });
  } catch (error) {
    // 업로드된 파일이 있다면 삭제
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          await fs.unlink(file.path);
        } catch (unlinkError) {
          console.error('파일 삭제 실패:', unlinkError);
        }
      }
    }
    
    throw error;
  }
});

// @desc    커뮤니티 게시글 수정
// @route   PUT /api/articles/:id
// @access  Private (소유자만)
exports.updateArticle = asyncHandler(async (req, res) => {
  // req.resource는 checkOwnership 미들웨어에서 설정됨
  const article = req.resource;

  // 필드 업데이트
  const { title, content, category, tags } = req.body;
  
  if (title) article.title = title;
  if (content) article.content = content;
  if (category) article.category = category;
  
  // 태그 처리
  if (tags) {
    const tagsArray = Array.isArray(tags) 
      ? tags 
      : tags.split(',').map(t => t.trim());
    article.tags = tagsArray;
  }

  // 저장
  await article.save();

  res.status(200).json({
    success: true,
    data: article
  });
});

// @desc    커뮤니티 게시글 삭제
// @route   DELETE /api/articles/:id
// @access  Private (소유자만)
exports.deleteArticle = asyncHandler(async (req, res) => {
  // req.resource는 checkOwnership 미들웨어에서 설정됨
  const article = req.resource;

  // 첨부파일 삭제
  if (article.attachments && article.attachments.length > 0) {
    for (const attachment of article.attachments) {
      try {
        const filePath = path.join(process.cwd(), attachment.path.replace(/^\//, ''));
        await fs.unlink(filePath);
      } catch (error) {
        console.error('파일 삭제 실패:', error.message);
        // 파일 삭제 실패해도 계속 진행
      }
    }
  }

  // 게시글 삭제
  await article.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    커뮤니티 게시글 좋아요/좋아요 취소
// @route   PUT /api/articles/:id/like
// @access  Private
exports.toggleLike = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    return res.status(404).json({
      success: false,
      message: '게시글을 찾을 수 없습니다'
    });
  }

  // 게시글 좋아요 여부 확인
  const isLiked = article.likes.includes(req.user.id);
  
  if (isLiked) {
    // 좋아요 취소
    article.likes = article.likes.filter(
      (like) => like.toString() !== req.user.id.toString()
    );
  } else {
    // 좋아요 추가
    article.likes.push(req.user.id);
  }

  await article.save();

  res.status(200).json({
    success: true,
    data: article
  });
});

// @desc    커뮤니티 게시글 검색
// @route   GET /api/articles/search
// @access  Public
exports.searchArticles = asyncHandler(async (req, res) => {
  const { q, page = 1, limit = 10, category, tags, sort = '-createdAt' } = req.query;
  
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
  if (category) {
    searchQuery.category = category;
  }
  
  // 태그 필터
  if (tags) {
    const tagArray = tags.split(',');
    searchQuery.tags = { $in: tagArray };
  }

  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const total = await Article.countDocuments(searchQuery);
  
  // 정렬 옵션
  let sortOption = sort;
  if (sort === 'popular') {
    sortOption = '-likeCount';
  } else if (sort === 'comments') {
    sortOption = '-commentCount';
  }

  const articles = await Article.find(searchQuery)
    .select('title content author category tags createdAt updatedAt viewCount likes')
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
    count: articles.length,
    pagination,
    data: articles,
    filters: {
      search: q,
      category: category || null,
      tags: tags ? tags.split(',') : null,
      sort: sort
    }
  });
});

// @desc    특정 사용자의 커뮤니티 게시글 가져오기
// @route   GET /api/articles/user/:userId
// @access  Public
exports.getUserArticles = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt', category, tags } = req.query;

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
    filterQuery.category = category;
  }
  
  // 태그 필터
  if (tags) {
    const tagArray = tags.split(',');
    filterQuery.tags = { $in: tagArray };
  }

  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const total = await Article.countDocuments(filterQuery);
  
  // 정렬 옵션
  let sortOption = sort;
  if (sort === 'popular') {
    sortOption = '-likeCount';
  } else if (sort === 'comments') {
    sortOption = '-commentCount';
  }

  const articles = await Article.find(filterQuery)
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
    count: articles.length,
    pagination,
    data: articles,
    filters: {
      category: category || null,
      tags: tags ? tags.split(',') : null,
      sort: sort
    }
  });
});

// @desc    특정 카테고리의 커뮤니티 게시글 가져오기
// @route   GET /api/articles/category/:category
// @access  Public
exports.getCategoryArticles = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt', tags, search } = req.query;
  const { category } = req.params;
  
  // 필터 쿼리 생성
  const filterQuery = { category };
  
  // 검색어 필터
  if (search) {
    filterQuery.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ];
  }
  
  // 태그 필터
  if (tags) {
    const tagArray = tags.split(',');
    filterQuery.tags = { $in: tagArray };
  }

  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const total = await Article.countDocuments(filterQuery);
  
  // 정렬 옵션
  let sortOption = sort;
  if (sort === 'popular') {
    sortOption = '-likeCount';
  } else if (sort === 'comments') {
    sortOption = '-commentCount';
  }

  const articles = await Article.find(filterQuery)
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
    count: articles.length,
    pagination,
    data: articles,
    filters: {
      category,
      search: search || null,
      tags: tags ? tags.split(',') : null,
      sort: sort
    }
  });
});

// @desc    인기 태그 목록 가져오기
// @route   GET /api/articles/popular-tags
// @access  Public
exports.getPopularTags = asyncHandler(async (req, res) => {
  // 태그별 게시글 수를 집계
  const tags = await Article.aggregate([
    { $unwind: '$tags' },
    {
      $group: {
        _id: '$tags',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);
  
  res.status(200).json({
    success: true,
    data: tags.map(tag => ({ tag: tag._id, count: tag.count }))
  });
});

// @desc    게시글에 첨부파일 추가
// @route   POST /api/articles/:id/attachments
// @access  Private (소유자만)
exports.addAttachments = asyncHandler(async (req, res) => {
  const article = req.resource; // checkOwnership 미들웨어에서 설정됨
  
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: '파일을 업로드해주세요'
    });
  }
  
  // 첨부파일 개수 제한 (최대 3개)
  if ((article.attachments?.length || 0) + req.files.length > 3) {
    return res.status(400).json({
      success: false,
      message: '첨부파일은 최대 3개까지 업로드할 수 있습니다'
    });
  }
  
  // 새 첨부파일 정보 추가
  const newAttachments = req.files.map(file => ({
    filename: file.filename,
    originalname: file.originalname,
    path: `/uploads/article-attachments/${file.filename}`,
    mimetype: file.mimetype,
    size: file.size
  }));
  
  // 기존 첨부파일 배열에 새 파일 추가
  article.attachments = [...(article.attachments || []), ...newAttachments];
  
  await article.save();
  
  res.status(200).json({
    success: true,
    data: article
  });
});

// @desc    게시글에서 첨부파일 삭제
// @route   DELETE /api/articles/:id/attachments/:filename
// @access  Private (소유자만)
exports.removeAttachment = asyncHandler(async (req, res) => {
  const article = req.resource; // checkOwnership 미들웨어에서 설정됨
  const filename = req.params.filename;
  
  // 해당 첨부파일 찾기
  const attachmentIndex = article.attachments.findIndex(att => att.filename === filename);
  
  if (attachmentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: '첨부파일을 찾을 수 없습니다'
    });
  }
  
  // 파일 시스템에서 파일 삭제
  try {
    const filePath = path.join(process.cwd(), 'uploads/article-attachments', filename);
    await fs.unlink(filePath);
  } catch (error) {
    console.error('파일 삭제 실패:', error);
    // 파일이 없더라도 DB에서는 삭제 계속 진행
  }
  
  // 배열에서 첨부파일 제거
  article.attachments.splice(attachmentIndex, 1);
  await article.save();
  
  res.status(200).json({
    success: true,
    data: article
  });
});