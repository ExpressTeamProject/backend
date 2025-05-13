// controllers/aiController.js
const OpenAIClient = require('../utils/openai');
const Post = require('../models/Post');
const { asyncHandler } = require('../middleware/errorHandler');

// OpenAI API 클라이언트 초기화
const openai = new OpenAIClient(process.env.OPENAI_API_KEY);

/**
 * @desc    게시글에 AI 응답 생성
 * @route   POST /api/ai/generate/:postId
 * @access  Private
 */
exports.generateAIResponse = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: '게시글을 찾을 수 없습니다'
    });
  }

  // AI 응답을 이미 갖고 있다면 반환
  if (post.aiResponse) {
    return res.status(200).json({
      success: true,
      data: {
        aiResponse: post.aiResponse
      }
    });
  }

  // AI 응답 생성
  const aiResponse = await openai.generateResponse(
    post.content,
    post.title,
    post.categories[0] || '기타',
    post.tags
  );

  // 게시글에 AI 응답 저장
  post.aiResponse = aiResponse;
  await post.save();

  res.status(200).json({
    success: true,
    data: {
      aiResponse
    }
  });
});

/**
 * @desc    게시글의 AI 응답 삭제
 * @route   DELETE /api/ai/response/:postId
 * @access  Private (소유자 또는 관리자만)
 */
exports.deleteAIResponse = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: '게시글을 찾을 수 없습니다'
    });
  }

  // 권한 확인 (게시글 작성자 또는 관리자만 삭제 가능)
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: '이 작업을 수행할 권한이 없습니다'
    });
  }

  // AI 응답 삭제
  post.aiResponse = undefined;
  await post.save();

  res.status(200).json({
    success: true,
    data: {}
  });
});

module.exports = exports;