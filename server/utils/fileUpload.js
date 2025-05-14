// utils/fileUpload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// 업로드 디렉토리 생성 함수
const createUploadDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`디렉토리 생성됨: ${dir}`);
  }
};

// 필요한 디렉토리 생성
[
  'uploads/profile-images', 
  'uploads/post-images', 
  'uploads/post-attachments',
  'uploads/comment-attachments',
  'uploads/article-images',
  'uploads/article-attachments'
].forEach(dir => {
  createUploadDir(path.join(__dirname, '..', dir));
});

// 안전한 파일명 생성 함수
const generateSafeFilename = (originalname) => {
  const extension = path.extname(originalname);
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString('hex');
  const safeBasename = path.basename(originalname, extension)
    .replace(/[^a-zA-Z0-9가-힣]/g, '_')
    .substring(0, 50); // 길이 제한
  return `${safeBasename}_${timestamp}_${randomString}${extension}`;
};

// 파일 저장 설정 - 프로필 이미지
const profileImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads/profile-images'));
  },
  filename: (req, file, cb) => {
    const safeFilename = generateSafeFilename(file.originalname);
    cb(null, `profile_${req.user.id}_${safeFilename}`);
  }
});

// 파일 저장 설정 - 게시글 이미지
const postImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads/post-images'));
  },
  filename: (req, file, cb) => {
    const safeFilename = generateSafeFilename(file.originalname);
    cb(null, `post_${safeFilename}`);
  }
});

// 파일 저장 설정 - 게시글 첨부파일
const postAttachmentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads/post-attachments'));
  },
  filename: (req, file, cb) => {
    const safeFilename = generateSafeFilename(file.originalname);
    cb(null, `attachment_${safeFilename}`);
  }
});

// 파일 저장 설정 - 댓글 첨부파일
const commentAttachmentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads/comment-attachments'));
  },
  filename: (req, file, cb) => {
    const safeFilename = generateSafeFilename(file.originalname);
    cb(null, `comment_${safeFilename}`);
  }
});

// 파일 저장 설정 - 커뮤니티 게시글 이미지
const articleImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads/article-images'));
  },
  filename: (req, file, cb) => {
    const safeFilename = generateSafeFilename(file.originalname);
    cb(null, `article_${safeFilename}`);
  }
});

// 파일 저장 설정 - 커뮤니티 게시글 첨부파일
const articleAttachmentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads/article-attachments'));
  },
  filename: (req, file, cb) => {
    const safeFilename = generateSafeFilename(file.originalname);
    cb(null, `article_att_${safeFilename}`);
  }
});

// 파일 필터 - 이미지만 허용
const imageFilter = (req, file, cb) => {
  const allowedMimetypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  
  if (allowedMimetypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('허용되지 않는 이미지 형식입니다. JPG, PNG, GIF, WebP, SVG 파일만 업로드 가능합니다.'), false);
  }
};

// 파일 필터 - 허용된 첨부파일 형식
const attachmentFilter = (req, file, cb) => {
  const allowedMimetypes = [
    // 이미지
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
    // 문서
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ];
  
  if (allowedMimetypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('허용되지 않는 파일 형식입니다. 이미지, PDF, 워드, 파워포인트, 엑셀 파일만 업로드 가능합니다.'), false);
  }
};

// Multer 설정
const upload = {
  profileImage: multer({
    storage: profileImageStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: imageFilter
  }),
  
  postImage: multer({
    storage: postImageStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: imageFilter
  }),
  
  postAttachment: multer({
    storage: postAttachmentStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: attachmentFilter
  }),

  commentAttachment: multer({
    storage: commentAttachmentStorage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB (댓글은 더 작게 제한)
    fileFilter: attachmentFilter
  }),

  articleImage: multer({
    storage: articleImageStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: imageFilter
  }),
  
  articleAttachment: multer({
    storage: articleAttachmentStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: attachmentFilter
  })
};

module.exports = upload;