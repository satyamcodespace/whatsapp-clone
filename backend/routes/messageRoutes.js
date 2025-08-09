// backend/routes/messageRoutes.js
const express = require('express');
const {
  getAllConversations,
  getMessagesByConversationId,
  sendMessage, // <-- Import the new function
} = require('../controllers/messageController');

const router = express.Router();

router.get('/conversations', getAllConversations);
router.get('/:id', getMessagesByConversationId);

// Route to handle sending a new message
router.post('/', sendMessage); // <-- Add this new route

module.exports = router;