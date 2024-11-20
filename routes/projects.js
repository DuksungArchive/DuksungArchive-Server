const express = require('express');
const app = express();

app.use(express.json()); // JSON 요청을 처리하기 위한 미들웨어

// 임시 데이터 저장
let projects = [];

// 프로젝트 업로드 API
app.post('/api/projects/upload', (req, res) => {
    const newProject = {
        id: projects.length + 1, // 임시로 ID 생성
        title: req.body.title,
        supervisor: req.body.supervisor,
        participants: req.body.participants,
        description: req.body.description,
        year: req.body.year,
        category: req.body.category,
    };

    projects.push(newProject); // 배열에 새 프로젝트 추가
    res.status(201).json({ message: 'Project uploaded successfully', project: newProject });
});

// 프로젝트 상세 조회 API
app.get('/api/projects/:id', (req, res) => {
    const projectId = parseInt(req.params.id); // URL에서 ID를 가져옴
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
});

// 좋아요 기능
app.post('/api/projects/:id/like', (req, res) => {
    const projectId = parseInt(req.params.id);
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    project.likes = (project.likes || 0) + 1; // 좋아요 수 증가
    res.json({ message: 'Liked the project!', likes: project.likes });
});

// 서버 실행
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
