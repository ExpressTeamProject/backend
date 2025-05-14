// seeder/setupAIUser.js
/**
 * AI 시스템 사용자 계정 설정 스크립트
 * 
 * 이 스크립트는 AI 댓글을 위한 시스템 사용자 계정을 생성하고
 * 기본 프로필 이미지를 설정합니다.
 */

const mongoose = require('mongoose');
const crypto = require('crypto');
const fs = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');
const User = require('../models/User');

// 환경 변수 로드
dotenv.config();

// AI 사용자 프로필 이미지 URL
const AI_PROFILE_IMAGE_URL = 'https://i.imgur.com/TupkL9s.png'; // 로봇 이미지 URL (임시)
const AI_USERNAME = 'ai-assistant';
const AI_NICKNAME = 'AI 도우미';
const AI_EMAIL = 'ai-assistant@system.local';

// 이미지 다운로드 함수
async function downloadImage(url, outputPath) {
  const axios = require('axios');
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'arraybuffer'
  });
  
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, response.data);
  console.log(`이미지가 다운로드되었습니다: ${outputPath}`);
}

async function setupAIUser() {
  try {
    // MongoDB 연결
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB에 연결되었습니다');

    // AI 사용자 계정 확인
    let aiUser = await User.findOne({ username: AI_USERNAME });

    if (aiUser) {
      console.log('AI 사용자 계정이 이미 존재합니다:', aiUser.username);
    } else {
      // 프로필 이미지 디렉토리 생성
      const uploadDir = path.join(__dirname, '..', 'uploads/system');
      await fs.mkdir(uploadDir, { recursive: true });
      
      // 프로필 이미지 다운로드
      const imagePath = path.join(uploadDir, 'ai-profile.png');
      await downloadImage(AI_PROFILE_IMAGE_URL, imagePath);
      
      // AI 사용자 생성
      aiUser = await User.create({
        username: AI_USERNAME,
        email: AI_EMAIL,
        password: crypto.randomBytes(20).toString('hex'), // 랜덤 비밀번호
        nickname: AI_NICKNAME,
        role: 'system',
        profileImage: '/uploads/system/ai-profile.png'
      });
      
      console.log('AI 사용자 계정이 생성되었습니다:', aiUser.username);
    }

    // 연결 종료
    await mongoose.disconnect();
    console.log('MongoDB 연결이 종료되었습니다');
    
    process.exit(0);
  } catch (error) {
    console.error('오류 발생:', error);
    process.exit(1);
  }
}

// 스크립트 실행
setupAIUser();