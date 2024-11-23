const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.post('/:id/like', projectController.incrementLikes);
router.post('/upload', projectController.uploadProject);

module.exports = router;