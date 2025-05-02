const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
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

    // 관리자 사용자 생성
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const admin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      nickname: '관리자',
      role: 'admin'
    });
    
    console.log('관리자 계정이 생성되었습니다:', admin.email);

    // 일반 사용자 생성
    const user1 = await User.create({
      username: 'user1',
      email: 'user1@example.com',
      password: await bcrypt.hash('user123', salt),
      nickname: '사용자1',
      role: 'user'
    });

    const user2 = await User.create({
      username: 'user2',
      email: 'user2@example.com',
      password: await bcrypt.hash('user123', salt),
      nickname: '사용자2',
      role: 'user'
    });
    
    console.log('일반 사용자 계정이 생성되었습니다');

    // 게시글 생성
    const post1 = await Post.create({
      title: '첫 번째 공지사항',
      content: '커뮤니티에 오신 것을 환영합니다. 이 게시판은 다양한 주제에 대해 토론하는 공간입니다.',
      author: admin._id,
      categories: ['공지사항']
    });

    const post2 = await Post.create({
      title: '자기소개 해주세요!',
      content: '새로운 회원들은 이 게시글에 댓글로 자기소개를 해주세요.',
      author: admin._id,
      categories: ['자유']
    });

    const post3 = await Post.create({
      title: 'Express와 React 연동하기',
      content: 'Express 백엔드와 React 프론트엔드를 연동하는 방법에 대해 설명합니다. CORS 설정, 프록시 설정 등의 내용을 다룹니다.',
      author: user1._id,
      categories: ['개발', '질문']
    });

    const post4 = await Post.create({
      title: 'MongoDB 사용 팁',
      content: 'MongoDB를 효율적으로 사용하기 위한 몇 가지 팁을 공유합니다. 인덱스 설정, 쿼리 최적화 등에 대해 알아봅시다.',
      author: user2._id,
      categories: ['개발', '정보']
    });
    
    console.log('게시글이 생성되었습니다');

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