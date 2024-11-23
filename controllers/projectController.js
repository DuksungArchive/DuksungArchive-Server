const Project = require('../models/Project');

// 프로젝트 목록 가져오기(필터 및 검색)
exports.getProjects = async (req, res) => {
    try {
        const { category, year, name } = req.query;
        const filter = {};

        if (category) filter.category = new RegExp(category, 'i');
        if (year) filter.year = parseInt(year);
        if (name) filter.name = new RegExp(name, 'i');

        const projects = await Project.find(filter);
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: '프로젝트를 가져오는 중 오류가 발생했습니다.' });
    }
};

// 프로젝트 업로드
exports.uploadProject = async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).json({ message: '프로젝트가 성공적으로 업로드되었습니다.', project: savedProject });
    } catch (err) {
        res.status(500).json({ error: '프로젝트 업로드 중 오류가 발생했습니다.' });
    }
};

// 프로젝트 상세 조회
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: '프로젝트를 찾을 수 없습니다.' });
        }
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ error: '프로젝트 세부 정보를 가져오는 중 오류가 발생했습니다.' });
    }
};

// 좋아요 증가
exports.incrementLikes = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: '프로젝트를 찾을 수 없습니다.' });
        }
        project.likes += 1;
        await project.save();
        res.status(200).json({ message: '좋아요가 추가되었습니다', likes: project.likes });
    } catch (err) {
        res.status(500).json({ error: '좋아요 업데이트 중 오류가 발생했습니다.' });
    }
};