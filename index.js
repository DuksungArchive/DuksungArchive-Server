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
    authMechanism: "SCRAM-SHA-256", // 인증 메커니즘 지정
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB에 연결되었습니다.'))
    .catch(err => console.error('MongoDB 연결 실패:', err));

// 라우트 설정
app.use('/api/projects', projectRoutes);
app.use('/api/guestbook', guestbookRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`));