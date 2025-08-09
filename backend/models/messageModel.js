// backend/models/messageModel.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  wa_id: { type: String, required: true }, // User ka WhatsApp ID
  name: { type: String }, // User ka Naam
  from_number: { type: String, required: true }, // Message bhejne wale ka number
  message_id: { type: String, required: true, unique: true }, // WhatsApp message ID
  body: { type: String, required: true }, // Message ka text
  timestamp: { type: Date, required: true }, // Message ka time
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'], // Status sirf in 3 values mein se hoga
    default: 'sent',
  },
  conversation_id: { type: String, required: true }, // Conversation ko group karne ke liye
});

// Collection ka naam 'processed_messages' hoga [cite: 19]
const Message = mongoose.model('processed_message', messageSchema);

module.exports = Message;