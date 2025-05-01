const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger 정의
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '문제 공유 커뮤니티',
      version: '1.0.0',
      description: 'Express와 MongoDB를 사용한 커뮤니티 웹 애플리케이션 API',
      contact: {
        name: '개발자',
        email: 'your-email@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: '개발 서버',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // API 경로 패턴
  apis: ['./routes/*.js', './models/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(specs, { explorer: true }),
  specs,
};