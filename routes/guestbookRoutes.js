const express = require('express');
const router = express.Router();
const guestbookController = require('../controllers/guestbookController');

router.get('/', guestbookController.getGuestbookEntries);
router.post('/', guestbookController.addGuestbookEntry);

module.exports = router;