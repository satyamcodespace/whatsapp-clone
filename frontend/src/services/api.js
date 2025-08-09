// frontend/src/services/api.js
import axios from 'axios';

// Create an Axios instance with the base URL of your backend
const apiClient = axios.create({
  // baseURL: 'http://localhost:5000/api', // backend URL  for local server
   baseURL: 'https://whatsapp-clone-et4m.onrender.com/api',
});

// Function to fetch the list of all conversations
export const fetchConversations = () => {
  return apiClient.get('/messages/conversations');
};

// Function to fetch all messages for a specific conversation
export const fetchMessages = (conversationId) => {
  return apiClient.get(`/messages/${conversationId}`);
};

// Add this to frontend/src/services/api.js

// Function to post a new message to the backend
export const postMessage = (messageData) => {
  return apiClient.post('/messages', messageData);
};