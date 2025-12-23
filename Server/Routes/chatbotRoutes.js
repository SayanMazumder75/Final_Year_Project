// Server/Routes/chatbotRoutes.js
const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

// Standard POST route
router.post('/', chatbotController.handleChatbotQuery);

module.exports = router;