

require('dotenv').config();
// conneting database
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ DB Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
