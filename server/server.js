const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 환경 변수 설정
dotenv.config();

// 포트 설정
const PORT = process.env.PORT || 5000;

// MongoDB 비활성화 설정
const DISABLE_MONGODB = true; // MongoDB 연결을 건너뛰려면 true로 설정

// 서버 시작 함수
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 실행 중입니다 (MongoDB ${DISABLE_MONGODB ? '비활성화됨' : '활성화됨'})`);
  });
};

// MongoDB 연결이 비활성화되었으면 바로 서버 시작
if (DISABLE_MONGODB) {
  console.log('MongoDB 연결이 비활성화되었습니다. 바로 서버를 시작합니다.');
  startServer();
} else {
  // MongoDB 연결 후 서버 시작
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB에 연결되었습니다');
      startServer();
    })
    .catch(err => {
      console.error('MongoDB 연결 오류:', err.message);
      process.exit(1);
    });
}

// 예상치 못한 에러 처리
process.on('unhandledRejection', (err) => {
  console.log('처리되지 않은 Promise rejection:', err);
  process.exit(1);
});