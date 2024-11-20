const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: String,
    supervisor: String,
    participants: [String],
    description: String,
    images: [String],
    files: [String],
    year: Number,
    category: String,
    likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Project', ProjectSchema);
