// 에러 처리 미들웨어
exports.errorHandler = (err, req, res, next) => {
    console.error(err);
  
    let error = { ...err };
    error.message = err.message;
  
    // Mongoose 잘못된 ObjectId
    if (err.name === 'CastError') {
      const message = '리소스를 찾을 수 없습니다';
      error = { message, statusCode: 404 };
    }
  
    // Mongoose 중복 키 에러
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const message = `${field} 필드의 값이 이미 사용 중입니다`;
      error = { message, statusCode: 400 };
    }
  
    // Mongoose 유효성 검사 실패
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message);
      error = { message, statusCode: 400 };
    }
  
    // JWT 만료
    if (err.name === 'TokenExpiredError') {
      const message = '토큰이 만료되었습니다. 다시 로그인해주세요';
      error = { message, statusCode: 401 };
    }
  
    // JWT 유효하지 않음
    if (err.name === 'JsonWebTokenError') {
      const message = '유효하지 않은 토큰입니다. 다시 로그인해주세요';
      error = { message, statusCode: 401 };
    }
  
    // 응답 반환
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || '서버 에러',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  };
  
  // 비동기 함수 에러 처리 래퍼
  exports.asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);