const express = require("express");
const path = require("path");
const app = express();
const connectDB = require('./config/db');
require("dotenv").config();
const session = require('express-session');
const flash = require('connect-flash');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // set to true if using HTTPS
}));


app.use(flash());
app.use((req, res, next) => {
  res.locals.message = req.flash('message'); // You can use any key, like 'error' or 'success'
  next();
});



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
