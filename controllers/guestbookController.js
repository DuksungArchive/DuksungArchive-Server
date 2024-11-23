const Guestbook = require('../models/Guestbook');

// 방명록 목록 가져오기
exports.getGuestbookEntries = async (req, res) => {
    try {
        const entries = await Guestbook.find().sort({ timestamp: -1 });
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: '방명록 항목을 가져오는 중 오류가 발생했습니다.' });
    }
};

// 방명록 항목 추가
exports.addGuestbookEntry = async (req, res) => {
    try {
        const { nickname, message } = req.body;
        const newEntry = new Guestbook({ nickname, message });
        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
    } catch (err) {
        res.status(500).json({ error: '방명록 항목을 추가하는 중 오류가 발생했습니다.' });
    }
};