import axios from 'axios';

// Create an Axios instance.
const apiClient = axios.create({
  // Use a relative URL for the baseURL.
  // This allows Vercel to correctly route API requests in production.
  baseURL: '/api',
});

// Function to fetch the list of all conversations.
export const fetchConversations = () => {
  return apiClient.get('/messages/conversations');
};

// Function to fetch all messages for a specific conversation.
export const fetchMessages = (conversationId) => {
  return apiClient.get(`/messages/${conversationId}`);
};

// Function to post a new message to the backend.
export const postMessage = (messageData) => {
  return apiClient.post('/messages', messageData);
};

export default apiClient;