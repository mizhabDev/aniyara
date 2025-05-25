//app.js
const express = require("express");
const path = require("path");
const app = express();
const fs = require('fs');
const connectDB = require('./config/db');
require("dotenv").config();
const session = require('express-session');
const flash = require('connect-flash');


// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'my_secret_key_aniyara',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// flash middleware 

app.use(flash());
app.use((req, res, next) => {
  const errorMessages = req.flash('error');
  const successMessages = req.flash('success');
  res.locals.message = errorMessages.length > 0 ? errorMessages[0] : (successMessages.length > 0 ? successMessages[0] : null);
  res.locals.messageType = errorMessages.length > 0 ? 'error' : (successMessages.length > 0 ? 'success' : null);
  next();
});



// Database connection

connectDB();


// make a folder called uploads if not exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}



// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));


// Add this before your routes


// User Routes
const userRoutes = require("./routes/userRoutes");
app.use("/", userRoutes);

// Admin Routes
const adminRoutes=require("./routes/adminRoutes");
app.use("/admin",adminRoutes);





// Cloudinary Routes - used to handle based image routes 
const uploadRoutes = require("./routes/uploadRoutes")
app.use("/api",uploadRoutes);


 


const PORT = process.env.API_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
