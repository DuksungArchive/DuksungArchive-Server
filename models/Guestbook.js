const mongoose = require('mongoose');

const guestbookSchema = new mongoose.Schema({
    nickname: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Guestbook', guestbookSchema);