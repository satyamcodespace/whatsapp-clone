const express = require('express');
const {
  getAllConversations,
  getMessagesByConversationId,
  sendMessage, 
} = require('../controllers/messageController');

const router = express.Router();

router.get('/conversations', getAllConversations);
router.get('/:id', getMessagesByConversationId);

// Route to handle sending a new message
router.post('/', sendMessage); 

module.exports = router;