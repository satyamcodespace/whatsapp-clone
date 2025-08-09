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
// CORS ko theek kiya gaya hai taaki dono frontend URL se request aa sake
const allowedOrigins = [
  "https://whatsapp-clone-et4m.onrender.com",
  "https://whatsapp-clone-ui.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
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