/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - password
 *        - nickname
 *      properties:
 *        id:
 *          type: string
 *          description: 사용자 ID
 *        username:
 *          type: string
 *          description: 사용자 이름 (3-20자)
 *        email:
 *          type: string
 *          description: 사용자 이메일
 *        password:
 *          type: string
 *          description: 사용자 비밀번호 (최소 6자)
 *        nickname:
 *          type: string
 *          description: 사용자 닉네임 (최대 30자)
 *        profileImage:
 *          type: string
 *          description: 프로필 이미지 URL
 *        role:
 *          type: string
 *          enum: [user, admin]
 *          description: 사용자 권한
 *      example:
 *        username: test_user
 *        email: user@example.com
 *        password: password123
 *        nickname: 테스터
 *        profileImage: default-profile.jpg
 *        role: user
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, '사용자 이름은 필수입니다'],
      unique: true,
      trim: true,
      minlength: [3, '사용자 이름은 최소 3자 이상이어야 합니다'],
      maxlength: [20, '사용자 이름은 최대 20자까지 가능합니다'],
    },
    email: {
      type: String,
      required: [true, '이메일은 필수입니다'],
      unique: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        '유효한 이메일 주소를 입력해주세요',
      ],
    },
    password: {
      type: String,
      required: [true, '비밀번호는 필수입니다'],
      minlength: [6, '비밀번호는 최소 6자 이상이어야 합니다'],
      select: false,
    },
    nickname: {
      type: String,
      required: [true, '닉네임은 필수입니다'],
      maxlength: [30, '닉네임은 최대 30자까지 가능합니다'],
    },
    profileImage: {
      type: String,
      default: 'default-profile.jpg',
    },
    bio: {
      type: String,
      maxlength: [500, '자기소개는 최대 500자까지 가능합니다'],
    },
    major: {
      type: String,
      enum: ['수학', '물리학', '화학', '생물학', '컴퓨터공학', '전자공학', '기계공학', '경영학', '경제학', '심리학', '사회학', '기타'],
      default: '기타',
    },
    website: {
      type: String,
    },
    socialLinks: {
      github: {
        type: String,
        validate: {
          validator: function(v) {
            return !v || v.includes('github.com/');
          },
          message: 'GitHub URL 형식이 올바르지 않습니다'
        }
      },
      twitter: {
        type: String,
        validate: {
          validator: function(v) {
            return !v || v.includes('twitter.com/');
          },
          message: 'Twitter URL 형식이 올바르지 않습니다'
        }
      }
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'system'],
      default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// 비밀번호 해싱 미들웨어
UserSchema.pre('save', async function (next) {
  // 비밀번호가 수정되지 않았다면 다음 미들웨어로
  if (!this.isModified('password')) {
    return next();
  }

  // 비밀번호 해싱
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 비밀번호 확인 메서드
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// 리프레시 토큰 생성 메서드 (새로 추가)
UserSchema.methods.getRefreshToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
  );
};

// 토큰 생성 및 쿠키 설정 헬퍼 함수
const sendTokenResponse = (user, statusCode, res) => {
  // 액세스 토큰 생성
  const token = user.getSignedJwtToken();
  
  // 리프레시 토큰 생성
  const refreshToken = user.getRefreshToken();

  const accessOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  
  const refreshOptions = {
    expires: new Date(
      Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRE) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    path: '/api/auth/refresh-token'  // 리프레시 토큰 쿠키는 특정 경로에서만 접근 가능
  };

  // HTTPS인 경우에만 secure 옵션 설정
  if (process.env.NODE_ENV === 'production') {
    accessOptions.secure = true;
    refreshOptions.secure = true;
  }

  // 필요한 사용자 정보만 응답에 포함
  const userData = {
    id: user._id,
    username: user.username,
    email: user.email,
    nickname: user.nickname,
    role: user.role
  };

  res
    .status(statusCode)
    .cookie('token', token, accessOptions)
    .cookie('refreshToken', refreshToken, refreshOptions)
    .json({
      success: true,
      token,
      refreshToken,  // 클라이언트에서도 저장할 수 있도록 리프레시 토큰 포함
      user: userData
    });
};

module.exports = mongoose.model('User', UserSchema);