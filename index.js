const express = require('express'); // Express 라이브러리 가져오기
const bodyParser = require('body-parser'); // 요청 데이터를 처리하기 위한 미들웨어
const cors = require('cors'); // 크로스-도메인 요청 허용

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json()); // JSON 요청 처리

// 임시 데이터 저장소 (DB 대신 사용하는 배열)
let projects = [];

// 기본 라우트
app.get('/', (req, res) => {
    res.send('Hello, Backend!');
});

// 프로젝트 업로드 API
app.post('/api/projects/upload', (req, res) => {
    const newProject = {
        id: projects.length + 1, // ID 자동 생성
        title: req.body.title, // 요청에서 제목 가져오기
        supervisor: req.body.supervisor, // 지도 교수 정보
        participants: req.body.participants, // 참여자 리스트
        description: req.body.description, // 프로젝트 설명
        year: req.body.year, // 연도
        category: req.body.category, // 카테고리
        likes: 0, // 초기 좋아요 수는 0
    };

    projects.push(newProject); // 배열에 새 프로젝트 추가
    res.status(201).json({ message: 'Project uploaded successfully', project: newProject });
});

// 프로젝트 상세 조회 API
app.get('/api/projects/:id', (req, res) => {
    const projectId = parseInt(req.params.id); // URL에서 프로젝트 ID 가져오기
    const project = projects.find(p => p.id === projectId); // ID로 프로젝트 찾기

    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
});

//좋아요기능
app.post('/api/projects/:id/like', (req, res) => {
    const projectId = parseInt(req.params.id); // URL에서 ID 가져오기
    const project = projects.find(p => p.id === projectId); // ID로 프로젝트 찾기

    if (!project) {
        return res.status(404).json({ message: 'Project not found' }); // 프로젝트가 없으면 404 응답
    }

    project.likes = (project.likes || 0) + 1; // 좋아요 수 증가
    res.json({ message: 'Liked the project!', likes: project.likes });
});


// 서버 실행
const PORT = 5000; // 사용할 포트 번호
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
