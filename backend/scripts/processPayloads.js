

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Message = require('../models/messageModel');


connectDB();

const processFiles = async () => {
  const dataDir = path.join(__dirname, 'data');
  const files = fs.readdirSync(dataDir);

  console.log(`Found ${files.length} files to process.`);

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const payload = JSON.parse(fileContent);

    try {
      
      const value = payload.metaData.entry[0].changes[0].value;

      
      if (value.messages) {
        const messageData = value.messages[0];
        const contactData = value.contacts[0];

        const messageDoc = {
          wa_id: contactData.wa_id,
          name: contactData.profile.name,
          from_number: messageData.from,
          message_id: messageData.id,
          body: messageData.text.body,
          timestamp: new Date(parseInt(messageData.timestamp) * 1000), // Convert Unix timestamp to Date
          status: 'sent', // Default status
          conversation_id: payload._id.split('-')[0], // e.g., 'conv1'
        };
        
        // Use findOneAndUpdate with upsert to avoid duplicates
        await Message.findOneAndUpdate(
          { message_id: messageDoc.message_id },
          messageDoc,
          { upsert: true, new: true }
        );
        console.log(`Processed message: ${messageDoc.message_id}`);

      } 
      // Check if it's a status update payload [cite: 20]
      else if (value.statuses) {
        const statusData = value.statuses[0];
        const messageIdToUpdate = statusData.id;
        const newStatus = statusData.status;

        await Message.findOneAndUpdate(
          { message_id: messageIdToUpdate },
          { $set: { status: newStatus } }
        );
        console.log(`Updated status for ${messageIdToUpdate} to ${newStatus}`);
      }
    } catch (error) {
      console.error(`Failed to process file ${file}:`, error);
    }
  }

  console.log('All files processed.');
  mongoose.disconnect(); // Disconnect after script is done
};

// Run the script
processFiles();