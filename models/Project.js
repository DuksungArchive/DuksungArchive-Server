const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    likes: { type: Number, default: 0 },
    description: String,
    images: [String],
    major: String,
    category: String,
    year: Number,
    team_name: String,
    participants: [
        { name: String, role: String }
    ],
    instagram_link: String,
    github_link: String,
    video_links: [String],
    detailed_description: String,
    main_features: [String]
});

module.exports = mongoose.model('Project', projectSchema);