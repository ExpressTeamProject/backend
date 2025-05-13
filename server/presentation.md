---
marp: true
theme: default
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
---

# Express.js로 배우는 웹 백엔드 개발
## 고등학생을 위한 쉬운 설명서

---

## 목차

1. 웹 개발이란? (프론트엔드 vs 백엔드)
2. Node.js는 무엇인가요?
3. Express 프레임워크 소개
4. API란 무엇인가요?
5. Express의 3대 핵심 요소
   - 라우터(Router): 길 안내하기
   - 미들웨어(Middleware): 도우미들
   - 컨트롤러(Controller): 일 처리하기
6. 실제 코드 예시
7. 정리 및 자주 묻는 질문

---

## 웹 개발이란? 

### 웹사이트는 어떻게 만들어질까요?

**프론트엔드 (Frontend)**: 우리가 보는 부분
- 웹 브라우저에서 실행되는 코드
- 사용자와 직접 상호작용하는 부분
- HTML, CSS, JavaScript로 만듦

**백엔드 (Backend)**: 보이지 않는 부분
- 서버에서 실행되는 코드
- 데이터 저장 및 처리
- 보안 및 인증 담당
- Node.js, Python, Java 등으로 만듦

---

## 일상생활 속 프론트엔드와 백엔드

### 식당으로 비유해보면:

**프론트엔드** = 식당의 홀
- 고객(사용자)이 직접 보고 경험하는 공간
- 메뉴판, 테이블, 의자, 분위기(디자인)
- 직원들의 응대 방식(사용자 경험)

**백엔드** = 식당의 주방
- 고객에게 보이지 않는 공간
- 음식 조리(데이터 처리)
- 식재료 보관(데이터베이스)
- 주방 규칙(보안 규칙)

---

## 백엔드가 하는 일

1. **데이터 저장 및 관리**
   - 회원 정보, 게시글, 댓글 등을 데이터베이스에 저장

2. **사용자 인증 및 권한 관리**
   - 로그인, 회원가입, 접근 권한 확인

3. **비즈니스 로직 처리**
   - 주문 처리, 결제, 통계 계산 등

4. **API 제공**
   - 프론트엔드와 통신할 수 있는 창구 제공

---

## Node.js는 무엇인가요?

### JavaScript를 서버에서도 실행할 수 있게 해주는 도구

- 원래 JavaScript는 웹 브라우저에서만 실행 가능했음
- Node.js 덕분에 서버에서도 JavaScript 사용 가능!
- 구글 크롬의 V8 엔진 기반으로 만들어짐
- 2009년에 등장한 이후 백엔드 개발의 인기 기술이 됨

---

## Node.js의 특징

1. **비동기 처리**
   - 여러 일을 동시에 처리 가능
   - 비유: 주문을 받은 후 다른 고객 응대 가능

2. **빠른 실행 속도**
   - 구글의 V8 엔진 덕분에 빠른 성능

3. **NPM (Node Package Manager)**
   - 다양한 외부 패키지(라이브러리) 사용 가능
   - 비유: 앱스토어에서 앱 설치하듯이 필요한 도구 설치

4. **크로스 플랫폼**
   - Windows, Mac, Linux 등 모든 운영체제에서 실행 가능

---

## Express란 무엇인가요?

### Node.js를 위한 웹 프레임워크

- **프레임워크**: 개발에 필요한 기본 구조와 도구를 제공하는 틀
- Express는 Node.js로 웹 서버를 쉽게 만들 수 있게 도와줌
- 2010년에 등장했으며 현재 가장 인기 있는 Node.js 프레임워크
- 간단하고 유연한 구조가 특징

---

## Express의 장점

1. **간결한 코드**
   - 적은 코드로 강력한 기능 구현 가능

2. **미들웨어 시스템**
   - 다양한 기능을 쉽게 추가 가능

3. **라우팅 시스템**
   - URL 주소 관리가 쉬움

---

## Express의 장점 (계속)

4. **템플릿 엔진 지원**
   - 동적인 HTML 페이지 생성 가능

5. **대규모 커뮤니티**
   - 많은 자료와 패키지 사용 가능

---

## 가장 기본적인 Express 서버

```javascript
// 필요한 모듈 가져오기
const express = require('express');

// Express 애플리케이션 생성
const app = express();

// 포트 번호 설정
const PORT = 5000;

// 루트 경로(/) 접속 시 응답 설정
app.get('/', (req, res) => {
  res.send('안녕하세요! Express 서버입니다.');
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
```

---

## API란 무엇인가요?

### API(Application Programming Interface)

- 프로그램과 프로그램이 소통하는 방법
- 프론트엔드와 백엔드가 데이터를 주고받는 규칙
- 다른 서비스의 기능을 가져와 사용할 수 있게 해줌

---

## API 이해하기 - 일상생활 비유

### 레스토랑으로 비유해보면:

- **고객(프론트엔드)** - 음식을 주문하는 사람
- **메뉴판(API 문서)** - 어떤 음식을 주문할 수 있는지 알려주는 목록
- **웨이터(API)** - 주방에 주문을 전달하고 음식을 가져오는 중개자
- **주방(백엔드)** - 실제 음식을 만드는 곳

고객은 메뉴판을 보고 웨이터에게 주문하면,
웨이터가 주방에 전달하고 완성된 음식을 가져옵니다.

프론트엔드도 API를 통해 백엔드에 데이터를 요청하고 응답을 받습니다.

---

## REST API

### REST(Representational State Transfer)란?

- 웹 API를 설계하는 인기 있는 방식
- 자원(Resource)을 URL로 표현
- HTTP 메소드(GET, POST 등)로 작업 종류 구분
- JSON 형식으로 데이터 주고받음

---

## HTTP 메소드의 종류

| 메소드 | 의미 | 일상생활 비유 |
|--------|------|--------------|
| GET | 데이터 조회 | 책장에서 책 꺼내보기 |
| POST | 새 데이터 생성 | 새 책 구입해서 책장에 넣기 |
| PUT | 데이터 전체 수정 | 책을 새 책으로 완전히 교체하기 |
| PATCH | 데이터 일부 수정 | 책의 일부 페이지만 수정하기 |
| DELETE | 데이터 삭제 | 책장에서 책 버리기 |

---

## API 응답 예시 (JSON 형식)

```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "user1",
    "email": "user1@example.com",
    "nickname": "사용자1",
    "role": "user"
  }
}
```

JSON(JavaScript Object Notation): 데이터를 표현하는 형식
- 사람이 읽기 쉽고 기계도 처리하기 쉬움
- 키-값 쌍으로 구성됨 (예: "username": "user1")
- 다양한 프로그래밍 언어에서 지원됨

---

## Express의 3대 핵심 요소

### 웹 서버를 만드는 세 가지 주요 부품:

1. **라우터(Router)**: 길 안내하기
   - 어떤 요청을 어디로 보낼지 결정

2. **미들웨어(Middleware)**: 도우미들
   - 요청을 처리하는 중간 단계 함수들

3. **컨트롤러(Controller)**: 일 처리하기
   - 실제 비즈니스 로직 처리

---

## 라우터(Router)란?

### 일상생활 비유:

**도로 표지판**
- URL 경로(주소)를 보고 어디로 가야할지 안내해주는 역할
- 예: '서울' 표지판을 따라가면 서울로 갈 수 있음

**우체국 분류작업**
- 편지(요청)의 주소(URL)를 보고 올바른 담당자에게 전달

### 역할:
- 클라이언트의 요청 URL을 보고 적절한 처리 함수로 연결
- HTTP 메소드(GET, POST 등)에 따라 다른 작업 수행

---

## Express 라우터 코드 예시

```javascript
// routes/authRoutes.js - 실제 프로젝트 코드
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 회원가입 라우트 - POST /auth/register
router.post('/register', authController.register);

// 로그인 라우트 - POST /auth/login
router.post('/login', authController.login);

// 로그아웃 라우트 - GET /auth/logout
router.get('/logout', authController.logout);

// 현재 로그인한 사용자 정보 - GET /auth/me
router.get('/me', protect, authController.getMe);

module.exports = router;
```

---

## 라우터 설명

```javascript
// 라우터 코드
router.post('/register', authController.register);
```

이 코드의 의미:
- `router.post`: HTTP POST 요청을 처리
- `'/register'`: '/register' URL 경로로 오는 요청을 처리
- `authController.register`: 이 요청을 처리할 함수

예시:
- 클라이언트가 '/auth/register'로 POST 요청을 보내면
- Express는 이 요청을 authController.register 함수로 전달

---

## 라우터 사용 방법

```javascript
// app.js - 실제 프로젝트 코드
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

// API 라우트 등록
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
```

`app.use('/auth', authRoutes)` 의미:
- '/auth'로 시작하는 모든 요청은 authRoutes로 처리
- 예: '/auth/login', '/auth/register' 등

---

## 미들웨어(Middleware)란?

### 일상생활 비유:

**공장의 생산 라인**
- 원자재(요청)가 완성품(응답)이 되기까지 여러 작업대를 거침
- 각 작업대는 특정 작업만 담당하고 다음 작업대로 전달

**영화관 입장 절차**
- 티켓 확인 → 음식물 검사 → 상영관 안내
- 각 단계를 통과해야 다음 단계로 진행 가능

### 역할:
- 요청과 응답 사이에서 다양한 작업 수행
- 여러 미들웨어가 순차적으로 실행됨

---

## 미들웨어 동작 방식

```
클라이언트 요청 → 미들웨어1 → 미들웨어2 → ... → 라우트 핸들러 → 응답
```

예시:
1. **로깅 미들웨어**: 요청 기록
2. **인증 미들웨어**: 사용자 로그인 확인
3. **데이터 파싱 미들웨어**: 요청 데이터 처리
4. **라우트 핸들러**: 최종 작업 수행
5. **응답**: 클라이언트에게 결과 전송

---

## 미들웨어 예시 코드

```javascript
// middleware/auth.js - 실제 프로젝트 코드
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 사용자 인증 확인 미들웨어
exports.protect = async (req, res, next) => {
  let token;

  // 헤더에서 Authorization 토큰 확인
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Bearer 토큰에서 jwt 추출
    token = req.headers.authorization.split(' ')[1];
  }

  // 토큰이 없으면 접근 거부
  if (!token) {
    return res.status(401).json({
      success: false,
      message: '이 리소스에 접근하려면 로그인이 필요합니다',
    });
  }

  try {
    // 토큰 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 사용자 정보를 요청 객체에 추가
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: '이 토큰에 해당하는 사용자를 찾을 수 없습니다',
      });
    }

    next(); // 다음 미들웨어로 진행
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: '인증에 실패했습니다',
    });
  }
};
```

---

## 미들웨어 사용 방법

```javascript
// routes/authRoutes.js - 실제 프로젝트 코드
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// 로그인 필요 없는 라우트
router.post('/register', authController.register);
router.post('/login', authController.login);

// 로그인 필요한 라우트 - protect 미들웨어 사용
router.get('/me', protect, authController.getMe);
router.put('/updatedetails', protect, authController.updateDetails);
```

`protect` 미들웨어의 역할:
- 사용자가 로그인했는지 확인
- 로그인하지 않았다면 오류 메시지 반환
- 로그인했다면 다음 단계(컨트롤러)로 진행

---

## 자주 사용되는 미들웨어

1. **express.json()**: JSON 형식의 요청 데이터 처리
2. **express.urlencoded()**: 폼 데이터 처리
3. **cors**: 다른 도메인의 요청 허용
4. **helmet**: 보안 헤더 설정
5. **morgan**: 요청 로깅
6. **multer**: 파일 업로드 처리
7. **cookie-parser**: 쿠키 처리
8. **express-session**: 세션 관리

---

## 컨트롤러(Controller)란?

**레스토랑 주방장**
- 주문(요청)을 받아 요리(처리)하고 음식(응답)을 제공
- 재료(데이터)를 다루는 전문가

**영화 감독**
- 배우(데이터)에게 지시하고 촬영(처리)으로 영화(응답) 제작
- 전체 제작 과정을 총괄

### 역할:
- 비즈니스 로직 처리
- 데이터베이스 작업 수행
- 응답 데이터 구성

---

## 컨트롤러 예시 코드

```javascript
// controllers/authController.js - 실제 프로젝트 코드
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');

// 사용자 로그인
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 이메일과 비밀번호 확인
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: '이메일과 비밀번호를 입력해주세요'
    });
  }

  // 사용자 조회 (비밀번호 포함)
  const user = await User.findOne({ email }).select('+password');

  // 사용자가 존재하지 않는 경우
  if (!user) {
    return res.status(401).json({
      success: false,
      message: '유효하지 않은 인증 정보입니다'
    });
  }

  // 비밀번호 확인
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: '유효하지 않은 인증 정보입니다'
    });
  }

  // 토큰 생성 및 응답
  sendTokenResponse(user, 200, res);
});
```

---

## 컨트롤러 설명

이 코드(login 컨트롤러)의 동작:

1. **요청 데이터 확인**:
   - 이메일과 비밀번호가 제공되었는지 확인

2. **사용자 조회**:
   - 데이터베이스에서 해당 이메일의 사용자 찾기

3. **비밀번호 확인**:
   - 제공된 비밀번호가 저장된 비밀번호와 일치하는지 확인

4. **응답 전송**:
   - 성공: 토큰 생성 및 사용자 정보 반환
   - 실패: 오류 메시지 반환

---

## MVC 패턴이란?

### Model-View-Controller 패턴: 웹 애플리케이션을 구조화하는 인기 있는 방식

1. **모델(Model)**:
   - 데이터와 비즈니스 로직 담당
   - 데이터베이스와 상호작용

2. **뷰(View)**:
   - 사용자에게 보여지는 부분
   - 데이터를 표시하는 방법 결정

3. **컨트롤러(Controller)**:
   - 모델과 뷰 사이의 중개자
   - 사용자 입력 처리 및 응답 생성

---

## Express에서의 MVC 구조

**모델(Model)**: 데이터 구조 정의
```javascript
// models/User.js
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true }
});
```

---

## Express에서의 MVC 구조 (계속)

**컨트롤러(Controller)**: 비즈니스 로직 처리
```javascript
// controllers/userController.js
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ success: true, data: users });
};
```

---

## Express에서의 MVC 구조 (계속)

**라우터(Router)**: URL 경로 정의 (뷰 역할의 일부)
```javascript
// routes/userRoutes.js
router.get('/', userController.getUsers);
```

---

## 전체 흐름도

```
클라이언트 요청
    ↓
Express 앱 (app.js)
    ↓
미들웨어 (cors, json 파싱 등)
    ↓
라우터 (경로에 따라 요청 분배)
    ↓
미들웨어 (인증 등)
    ↓
컨트롤러 (비즈니스 로직 처리)
    ↓
모델 (데이터베이스 작업)
    ↓
응답 생성 (JSON 데이터)
    ↓
클라이언트 응답
```

---

## 실제 프로젝트 구조

```
server/
├── config/          # 설정 파일
├── controllers/     # 비즈니스 로직
├── middleware/      # 미들웨어
├── models/          # 데이터 모델
├── routes/          # 라우터
├── app.js           # Express 앱 설정
└── server.js        # 서버 시작 파일
```

이 구조는 일반적인 Express 프로젝트의 기본 구조입니다.
각 폴더는 특정 역할의 코드들을 모아놓은 것입니다.


---

## 백엔드 개발 과정

1. **프로젝트 계획**:
   - 기능 정의
   - API 설계 (엔드포인트, 요청/응답 형식)

2. **환경 설정**:
   - Node.js, Express 설치
   - 필요한 패키지 설치

---

## 백엔드 개발 과정 (계속)

3. **프로젝트 구조 생성**:
   - 폴더 구조 설정

4. **데이터 모델 정의**:
   - 필요한 데이터 구조 설계

---

## 백엔드 개발 과정 (계속)

5. **API 구현**:
   - 라우터 설정
   - 컨트롤러 로직 작성
   - 미들웨어 개발

6. **테스트**:
   - API 엔드포인트 테스트
   - 오류 처리 확인

7. **배포**:
   - 서버에 애플리케이션 배포
   - 모니터링 설정

---

## 실제 Express 애플리케이션 예시

```javascript
// app.js - 실제 프로젝트 코드
const express = require('express');
const cors = require('cors');
const path = require('path');

// 라우트 가져오기
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

// 오류 처리 미들웨어
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));

// 라우트 설정
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// 404 처리
app.use((req, res, next) => {
  res.status(404).json({ message: '요청하신 리소스를 찾을 수 없습니다' });
});

// 에러 핸들러
app.use(errorHandler);

module.exports = app;
```

---

## 서버 실행 코드

```javascript
// server.js - 실제 프로젝트 코드
const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 환경 변수 설정
dotenv.config();

// 포트 설정
const PORT = process.env.PORT || 5000;

// 서버 시작 함수
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 실행 중입니다`);
  });
};

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
```

---

## Express의 장점 정리

1. **간단한 구조**: 
   - 적은 코드로 서버 구현 가능
   - 배우기 쉬움

2. **유연성**: 
   - 필요한 부분만 사용 가능
   - 다양한 미들웨어 조합 가능

---

## Express의 장점 정리 (계속)

3. **성능**: 
   - 빠른 속도와 적은 자원 사용

4. **커뮤니티**: 
   - 많은 자료와 예제
   - 다양한 패키지 사용 가능

---

## 백엔드 개발자가 되려면?

1. **기본 지식 습득**:
   - JavaScript 언어 기초
   - HTTP 프로토콜 이해
   - 데이터베이스 기초

2. **핵심 기술 학습**:
   - Node.js와 npm
   - Express 프레임워크
   - MongoDB 같은 데이터베이스

---

## 백엔드 개발자가 되려면? (계속)

3. **실습 프로젝트**:
   - 간단한 API 서버 만들기
   - CRUD 작업 구현하기
   - 인증 시스템 구현하기
   - 다양한 API 기능 구현하기
   - 다양한 공격 방식을 배우고 보안 시스템 구축하기

---

## 자주 묻는 질문

### Q: 독학이 가능할까요?
A: 네, 독학으로도 충분히 배울 수 있습니다. 인터넷에는 무료 강의와 문서가 많이 있습니다.

### Q: 백엔드와 프론트엔드 중 어느 것이 더 어려운가요?
A: 개인의 성향과 관심사에 따라 다릅니다. 백엔드는 로직과 데이터 처리에 집중하고, 프론트엔드는 디자인과 사용자 경험에 집중합니다.

---

## 정리

### Express로 백엔드 개발을 배우면:
- JavaScript 하나로 프론트엔드와 백엔드 모두 개발 가능
- 간결한 코드로 강력한 웹 서버 구축 가능
- 다양한 미들웨어로 쉽게 기능 확장 가능
- 커뮤니티가 크고 자료가 많아 배우기 좋음

### 앞으로의 학습 방향:
- MongoDB나 MySQL 같은 데이터베이스 학습
- 인증과 보안에 대한 이해 넓히기
- AWS, Heroku 같은 클라우드 서비스로 배포하기
- TypeScript로 더 안정적인 코드 작성하기

---

## 감사합니다!