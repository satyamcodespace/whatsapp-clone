const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  wa_id: { type: String, required: true }, 
  name: { type: String }, 
  from_number: { type: String, required: true }, 
  message_id: { type: String, required: true, unique: true }, 
  body: { type: String, required: true }, 
  timestamp: { type: Date, required: true },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'], 
    default: 'sent',
  },
  conversation_id: { type: String, required: true }, 
});


const Message = mongoose.model('processed_message', messageSchema);

module.exports = Message;