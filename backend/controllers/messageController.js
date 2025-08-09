
const Message = require('../models/messageModel');


const getAllConversations = async (req, res) => {
  try {
   
    const conversations = await Message.aggregate([
      // Sort messages by timestamp descending to get the latest first
      { $sort: { timestamp: -1 } },
      // Group by conversation_id and get the first document (which is the latest)
      {
        $group: {
          _id: '$conversation_id',
          name: { $first: '$name' },
          wa_id: { $first: '$wa_id' },
          lastMessage: { $first: '$body' },
          lastMessageTimestamp: { $first: '$timestamp' },
        },
      },
      // Sort conversations by the last message's time
      { $sort: { lastMessageTimestamp: -1 } },
    ]);

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conversations', error });
  }
};


// @desc    Get all messages for a specific conversation
// @route   GET /api/messages/:id
const getMessagesByConversationId = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const messages = await Message.find({ conversation_id: conversationId }).sort({
      timestamp: 'asc',
    });

    if (!messages) {
      return res.status(404).json({ message: 'No messages found for this conversation' });
    }

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};


const sendMessage = async (req, res) => {
  try {
    const { conversation_id, wa_id, name, body } = req.body;

    if (!conversation_id || !body) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newMessage = new Message({
      conversation_id,
      wa_id,
      name,
      body,
      // For this simulation, the sender is always the business
      from_number: '918329446654',
      // Generate a new WhatsApp-like message ID
      message_id: `wamid.BGM.${Date.now()}`,
      timestamp: new Date(),
      status: 'sent', // Default status for a new message
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};


module.exports = {
  getAllConversations,
  getMessagesByConversationId,
  sendMessage,
};