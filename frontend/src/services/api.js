import axios from 'axios';

// Create an Axios instance with the base URL of your backend
const apiClient = axios.create({
  baseURL: 'https://whatsapp-clone-api-usjx.onrender.com/api', 
});

export const fetchConversations = () => {
  return apiClient.get('/messages/conversations');
};

export const fetchMessages = (conversationId) => {
  return apiClient.get(`/messages/${conversationId}`);
};

export const postMessage = (messageData) => {
  return apiClient.post('/messages', messageData);
};

export default apiClient;