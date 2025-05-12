const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// 환경 변수 설정
dotenv.config();

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB에 연결되었습니다'))
  .catch(err => {
    console.error('MongoDB 연결 오류:', err.message);
    process.exit(1);
  });

// 시드 데이터
const seedData = async () => {
  try {
    // 기존 데이터 삭제
    await User.deleteMany();
    await Post.deleteMany();
    await Comment.deleteMany();

    console.log('기존 데이터가 삭제되었습니다');

    // 관리자 사용자 생성 - 직접 해싱을 수행하지 않고, 모델의 미들웨어가 처리하도록 함
    const admin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123', // 원본 비밀번호 전달
      nickname: '관리자',
      role: 'admin'
    });

    console.log('관리자 계정이 생성되었습니다:', admin.email);

    // 일반 사용자 생성 - 마찬가지로 원본 비밀번호 사용
    const user1 = await User.create({
      username: 'user1',
      email: 'user1@example.com',
      password: 'user123', // 원본 비밀번호 전달
      nickname: '사용자1',
      role: 'user'
    });

    const user2 = await User.create({
      username: 'user2',
      email: 'user2@example.com',
      password: 'user123', // 원본 비밀번호 전달
      nickname: '사용자2',
      role: 'user'
    });

    console.log('일반 사용자 계정이 생성되었습니다');

    // 게시글 생성
    const post1 = await Post.create({
      title: '첫 번째 공지사항',
      content: '커뮤니티에 오신 것을 환영합니다. 이 게시판은 다양한 주제에 대해 토론하는 공간입니다.',
      author: admin._id,
      categories: ['기타']
    });

    const post2 = await Post.create({
      title: '자기소개 해주세요!',
      content: '새로운 회원들은 이 게시글에 댓글로 자기소개를 해주세요.',
      author: admin._id,
      categories: ['기타']
    });

    const post3 = await Post.create({
      title: 'Express와 React 연동하기',
      content: 'Express 백엔드와 React 프론트엔드를 연동하는 방법에 대해 설명합니다. CORS 설정, 프록시 설정 등의 내용을 다룹니다.',
      author: user1._id,
      categories: ['컴퓨터공학']
    });

    const post4 = await Post.create({
      title: 'MongoDB 사용 팁',
      content: 'MongoDB를 효율적으로 사용하기 위한 몇 가지 팁을 공유합니다. 인덱스 설정, 쿼리 최적화 등에 대해 알아봅시다.',
      author: user2._id,
      categories: ['컴퓨터공학']
    });

    const post5 = await Post.create({
      title: '미적분학 기초 문제 풀이',
      content: '미적분학의 기초 개념인 극한, 연속성, 미분, 적분에 관한 문제 풀이를 공유합니다.',
      author: user1._id,
      categories: ['수학'],
      tags: ['미적분', '수학문제']
    });

    const post6 = await Post.create({
      title: '뉴턴의 운동법칙 이해하기',
      content: '물리학의 기본이 되는 뉴턴의 운동법칙에 대해 실생활 예시와 함께 설명합니다.',
      author: user2._id,
      categories: ['물리학'],
      tags: ['뉴턴', '운동법칙', '물리기초'],
      isSolved: true
    });

    const post7 = await Post.create({
      title: '화학반응식 균형 맞추기',
      content: '화학반응식의 균형을 맞추는 방법과 산화-환원 반응의 원리에 대해 알아봅시다.',
      author: user1._id,
      categories: ['화학'],
      tags: ['화학반응', '균형식']
    });

    const post8 = await Post.create({
      title: '세포분열 과정 정리',
      content: '유사분열과 감수분열의 차이점과 각 단계별 특징을 정리했습니다.',
      author: user2._id,
      categories: ['생물학'],
      tags: ['세포분열', '유사분열', '감수분열']
    });

    const post9 = await Post.create({
      title: '전자기학 기본 문제',
      content: '전자기학의 기본 개념인 전기장, 자기장, 전자기 유도에 관한 문제와 풀이를 공유합니다.',
      author: user1._id,
      categories: ['전자공학', '물리학'],
      tags: ['전자기학', '전기장', '자기장']
    });

    const post10 = await Post.create({
      title: '열역학 법칙 이해하기',
      content: '열역학 법칙들과 그 응용에 대해 설명합니다. 특히 엔트로피 개념을 중심으로 설명합니다.',
      author: user2._id,
      categories: ['물리학', '기계공학'],
      tags: ['열역학', '엔트로피'],
      isSolved: true
    });

    const post11 = await Post.create({
      title: '마케팅 전략 수립 방법',
      content: '효과적인 마케팅 전략을 수립하는 방법과 시장 분석 기법에 대해 설명합니다.',
      author: user1._id,
      categories: ['경영학'],
      tags: ['마케팅', '전략']
    });

    const post12 = await Post.create({
      title: '거시경제 지표 분석',
      content: '주요 거시경제 지표들의 의미와 이를 분석하는 방법에 대해 설명합니다.',
      author: user2._id,
      categories: ['경제학'],
      tags: ['거시경제', '경제지표']
    });

    console.log('다양한 카테고리의 게시글이 생성되었습니다');

    // 댓글 생성
    const comment1 = await Comment.create({
      content: '환영합니다! 좋은 커뮤니티가 되었으면 좋겠네요.',
      author: user1._id,
      post: post1._id
    });

    const comment2 = await Comment.create({
      content: '안녕하세요! 저는 새로 가입한 사용자1입니다. 잘 부탁드립니다.',
      author: user1._id,
      post: post2._id
    });

    const comment3 = await Comment.create({
      content: '안녕하세요! 저는 사용자2입니다. 주로 개발 관련 글을 쓸 예정입니다.',
      author: user2._id,
      post: post2._id
    });

    const comment4 = await Comment.create({
      content: '좋은 정보 감사합니다. MongoDB 인덱스 설정에 대해 더 자세히 알고 싶어요.',
      author: user1._id,
      post: post4._id
    });

    console.log('댓글이 생성되었습니다');

    // 게시글에 댓글 ID 추가
    post1.comments.push(comment1._id);
    await post1.save();

    post2.comments.push(comment2._id);
    post2.comments.push(comment3._id);
    await post2.save();

    post4.comments.push(comment4._id);
    await post4.save();

    console.log('시드 데이터가 성공적으로 추가되었습니다');
    process.exit();
  } catch (error) {
    console.error('시드 데이터 생성 오류:', error);
    process.exit(1);
  }
};

// 시드 데이터 실행
seedData();