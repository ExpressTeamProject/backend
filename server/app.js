const express = require('express');
const cors = require('cors');
const corsOptions = {
  // 개발 환경용 모든 출처 허용
  origin: "*",
  credentials: true,
};
const path = require('path');
const swaggerConfig = require('./config/swagger');

// 라우트 가져오기
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const downloadRoutes = require('./routes/downloadRoutes');

// 오류 처리 미들웨어
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// 정적 파일 제공 (uploads 폴더)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 서버 스테이터스 확인용 임시 페이지
app.get('/server-status', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>서버 상태</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        .status { padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .online { background-color: #d4edda; color: #155724; }
        .details { background-color: #f8f9fa; padding: 15px; border-radius: 5px; }
        h1 { color: #333; }
      </style>
    </head>
    <body>
      <h1>서버 상태 확인</h1>
      <div class="status online">
        <h2>✅ 서버 온라인</h2>
        <p>서버가 정상적으로 실행 중입니다.</p>
      </div>
      <div class="details">
        <h3>서버 정보:</h3>
        <ul>
          <li><strong>시간:</strong> ${new Date().toLocaleString()}</li>
          <li><strong>Node.js 버전:</strong> ${process.version}</li>
          <li><strong>플랫폼:</strong> ${process.platform}</li>
          <li><strong>메모리 사용량:</strong> ${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB</li>
        </ul>
      </div>
      <div class="api-test">
        <h3>API 테스트:</h3>
        <p>다음 API 엔드포인트를 테스트해 볼 수 있습니다:</p>
        <ul>
          <li><a href="/status" target="_blank">/status</a> - 서버 상태 JSON</li>
          <li><a href="/auth" target="_blank">/auth</a> - 인증 API</li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

// API 상태 확인 엔드포인트
app.get('/status', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date(),
    serverInfo: {
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsage: {
        rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`
      }
    }
  });
});

// 간단한 테스트 엔드포인트
app.get('/test', (req, res) => {
  res.send('서버가 정상적으로 실행 중입니다!');
});

// API 라우트
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/api-docs', swaggerConfig.serve, swaggerConfig.setup);
app.use('/download', downloadRoutes);

// 배포 환경에서는 React 정적 파일 제공
if (process.env.NODE_ENV === 'production') {
  // React 빌드 파일들을 제공
  app.use(express.static(path.join(__dirname, '../client/dist')));  // Vite는 dist 폴더 사용

  // 다른 라우트는 React 앱으로 리다이렉트
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

// 404 처리 - 모든 라우트 정의 후에 배치
app.use((req, res, next) => {
  res.status(404).json({ message: '요청하신 리소스를 찾을 수 없습니다' });
});

// 에러 핸들러
app.use(errorHandler);

module.exports = app;