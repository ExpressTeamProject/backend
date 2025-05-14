// controllers/userController.js
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @desc    모든 사용자 가져오기 (관리자용)
 * @route   GET /api/users
 * @access  Private/Admin
 */
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

/**
 * @desc    특정 사용자 가져오기
 * @route   GET /api/users/:id
 * @access  Private
 */
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다'
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

/**
 * @desc    사용자 생성 (관리자용)
 * @route   POST /api/users
 * @access  Private/Admin
 */
exports.createUser = asyncHandler(async (req, res) => {
  const { username, email, password, nickname, role } = req.body;

  // 사용자 생성
  const user = await User.create({
    username,
    email,
    password,
    nickname,
    role: role || 'user'  // 기본값은 'user'
  });

  res.status(201).json({
    success: true,
    data: user
  });
});

/**
 * @desc    사용자 정보 업데이트 (관리자용)
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 */
exports.updateUser = asyncHandler(async (req, res) => {
  const { username, email, nickname, role } = req.body;

  // 업데이트할 필드
  const fieldsToUpdate = {
    username,
    email,
    nickname,
    role
  };

  // undefined 필드 제거
  Object.keys(fieldsToUpdate).forEach(key => 
    fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
  );

  // 사용자 업데이트
  const user = await User.findByIdAndUpdate(
    req.params.id, 
    fieldsToUpdate, 
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다'
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

/**
 * @desc    사용자 삭제 (관리자용)
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다'
    });
  }

  // 관리자는 삭제할 수 없음 (선택적)
  if (user.role === 'admin') {
    return res.status(400).json({
      success: false,
      message: '관리자 계정은 삭제할 수 없습니다'
    });
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});