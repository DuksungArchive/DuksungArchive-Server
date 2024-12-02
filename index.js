const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // .env 파일 로드

const projectRoutes = require('./routes/projectRoutes');
const guestbookRoutes = require('./routes/guestbookRoutes');

const app = express();

app.use(cors({
    origin: '*', // 또는 특정 도메인으로 제한
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// MongoDB 연결
const mongoUri = process.env.MONGO_URI; // 환경 변수에서 URI 가져오기
mongoose.connect(mongoUri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB에 연결되었습니다.'))
    .catch(err => {
        console.error('MongoDB 연결 실패:');
        console.error('URI:', process.env.MONGO_URI); // 연결 문자열 출력 (비밀번호 숨기기)
        console.error('에러 메시지:', err.message);
        console.error('전체 에러 로그:', err);
      });

// 라우트 설정
app.use('/api/projects', projectRoutes);
app.use('/api/guestbooks', guestbookRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`));