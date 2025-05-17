// server/controllers/savedItemsController.js

const User = require('../models/User');
const Post = require('../models/Post');
const Article = require('../models/Article');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @desc    저장한 항목 목록 조회
 * @route   GET /api/user/saved-items
 * @access  Private
 */
exports.getSavedItems = asyncHandler(async (req, res) => {
  // 사용자 찾기 (저장된 항목 필드 포함)
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다'
    });
  }

  // 저장된 문제 조회
  const savedProblems = await Post.find({
    _id: { $in: user.savedItems?.problems || [] }
  }).populate({
    path: 'author',
    select: 'username nickname profileImage'
  });

  // 저장된 게시글 조회
  const savedPosts = await Article.find({
    _id: { $in: user.savedItems?.posts || [] }
  }).populate({
    path: 'author',
    select: 'username nickname profileImage'
  });

  res.status(200).json({
    success: true,
    data: {
      problems: savedProblems,
      posts: savedPosts
    }
  });
});

/**
 * @desc    저장 상태 토글 (저장/저장 취소)
 * @route   POST /api/user/saved-items/toggle
 * @access  Private
 */
exports.toggleSavedItem = asyncHandler(async (req, res) => {
  const { itemId, itemType } = req.body;

  // 입력값 검증
  if (!itemId || !['problem', 'post'].includes(itemType)) {
    return res.status(400).json({
      success: false,
      message: '유효하지 않은 요청입니다. itemId와 itemType(problem 또는 post)이 필요합니다.'
    });
  }

  // 사용자 찾기
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다'
    });
  }

  // 항목이 존재하는지 확인
  const model = itemType === 'problem' ? Post : Article;
  const item = await model.findById(itemId);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: '저장하려는 항목을 찾을 수 없습니다'
    });
  }

  // 저장 상태 토글
  const isSaved = await user.toggleSavedItem(itemId, itemType);

  res.status(200).json({
    success: true,
    isSaved,
    message: isSaved ? '항목이 저장되었습니다' : '항목 저장이 취소되었습니다'
  });
});

/**
 * @desc    특정 항목의 저장 여부 확인
 * @route   GET /api/user/saved-items/check
 * @access  Private
 */
exports.checkSavedItem = asyncHandler(async (req, res) => {
  const { itemId, itemType } = req.query;

  // 입력값 검증
  if (!itemId || !['problem', 'post'].includes(itemType)) {
    return res.status(400).json({
      success: false,
      message: '유효하지 않은 요청입니다. itemId와 itemType(problem 또는 post)이 필요합니다.'
    });
  }

  // 사용자 찾기
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다'
    });
  }

  // 저장 여부 확인
  const isSaved = user.isItemSaved(itemId, itemType);

  res.status(200).json({
    success: true,
    isSaved
  });
});