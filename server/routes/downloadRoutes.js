// routes/downloadRoutes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { asyncHandler } = require('../middleware/errorHandler');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

/**
 * @swagger
 * /download/attachment/{filename}:
 *   get:
 *     summary: 게시글 첨부파일 다운로드
 *     description: 게시글의 첨부파일을 다운로드합니다. 파일명을 통해 원본 파일을 찾아 다운로드합니다.
 *     tags: [Downloads]
 *     parameters:
 *       - in: path
 *         name: filename
 *         schema:
 *           type: string
 *         required: true
 *         description: 다운로드할 파일명
 *     responses:
 *       200:
 *         description: 파일 다운로드 스트림
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: 파일을 찾을 수 없음
 */
router.get(
  '/attachment/:filename',
  asyncHandler(async (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '..', 'uploads/post-attachments', filename);
    
    // 파일 존재 여부 확인
    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: '파일을 찾을 수 없습니다'
      });
    }
    
    // 원본 파일명 찾기
    const post = await Post.findOne({
      'attachments.filename': filename
    });
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '파일 정보를 찾을 수 없습니다'
      });
    }
    
    const attachment = post.attachments.find(att => att.filename === filename);
    const originalFilename = attachment ? attachment.originalname : filename;
    
    // Content-Disposition 헤더 설정 (다운로드 파일명)
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(originalFilename)}"`);
    res.setHeader('Content-Type', attachment.mimetype);
    
    // 파일 스트림 전송
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  })
);

/**
 * @swagger
 * /download/comment-attachment/{filename}:
 *   get:
 *     summary: 댓글 첨부파일 다운로드
 *     description: 댓글의 첨부파일을 다운로드합니다. 파일명을 통해 원본 파일을 찾아 다운로드합니다.
 *     tags: [Downloads]
 *     parameters:
 *       - in: path
 *         name: filename
 *         schema:
 *           type: string
 *         required: true
 *         description: 다운로드할 파일명
 *     responses:
 *       200:
 *         description: 파일 다운로드 스트림
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: 파일을 찾을 수 없음
 */
router.get(
  '/comment-attachment/:filename',
  asyncHandler(async (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '..', 'uploads/comment-attachments', filename);
    
    // 파일 존재 여부 확인
    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: '파일을 찾을 수 없습니다'
      });
    }
    
    // 원본 파일명 찾기
    const comment = await Comment.findOne({
      'attachments.filename': filename
    });
    
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: '파일 정보를 찾을 수 없습니다'
      });
    }
    
    const attachment = comment.attachments.find(att => att.filename === filename);
    const originalFilename = attachment ? attachment.originalname : filename;
    
    // Content-Disposition 헤더 설정 (다운로드 파일명)
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(originalFilename)}"`);
    res.setHeader('Content-Type', attachment.mimetype);
    
    // 파일 스트림 전송
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  })
);

module.exports = router;