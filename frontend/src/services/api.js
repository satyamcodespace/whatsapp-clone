// frontend/src/services/api.js
import axios from 'axios';

// Create an Axios instance with the base URL of your backend
const apiClient = axios.create({
  // Yahan apna live Render backend URL paste karein
  baseURL: 'https://your-backend-api-name.onrender.com/api', // <-- YEH LINE THEEK KARNI HAI
});

// Function to fetch the list of all conversations
export const fetchConversations = () => {
  return apiClient.get('/messages/conversations');
};

// Function to fetch all messages for a specific conversation
export const fetchMessages = (conversationId) => {
  return apiClient.get(`/messages/${conversationId}`);
};

// Function to post a new message to the backend
export const postMessage = (messageData) => {
  return apiClient.post('/messages', messageData);
};

export default apiClient;