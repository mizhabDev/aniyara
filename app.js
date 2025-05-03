const express = require("express");
const path = require("path");
const app = express();
const connectDB = require('./config/db');
require("dotenv").config();
const session = require('express-session');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',  // use a strong, secure key in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));



// Database connection
connectDB();









// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// User Routes
const userRoutes = require("./routes/userRoutes");
app.use("/", userRoutes);

// Admin Routes
const adminRoutes=require("./routes/adminRoutes");
app.use("/admin",adminRoutes);

const PORT = process.env.API_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
