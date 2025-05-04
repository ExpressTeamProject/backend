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
        name: 'KS WEB',
        email: 'admin@example.com',
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
      // 여기에 공통 응답 추가
      responses: {
        UnauthorizedError: {
          description: '인증 정보가 없거나 유효하지 않습니다'
        },
        ForbiddenError: {
          description: '접근 권한이 없습니다'
        },
        NotFoundError: {
          description: '요청한 리소스를 찾을 수 없습니다'
        },
        BadRequestError: {
          description: '잘못된 요청 형식입니다'
        }
      }
    },
    tags: [
      {
        name: 'Auth',
        description: '인증 관련 API'
      },
      {
        name: 'Users',
        description: '사용자 관리 API'
      },
      {
        name: 'Posts',
        description: '게시글 관련 API'
      },
      {
        name: 'Comments',
        description: '댓글 관련 API'
      }
    ]
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