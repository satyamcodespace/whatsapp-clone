// backend/index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const messageRoutes = require('./routes/messageRoutes');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middlewares
// CORS ko configure kiya gaya hai taaki frontend se request block na ho
app.use(cors({
  // Yahan aapke live frontend ka URL hona chahiye
  origin: "https://whatsapp-clone-ui.onrender.com" 
}));

app.use(express.json()); // To parse JSON request bodies

// API Routes
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('WhatsApp clone server is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});