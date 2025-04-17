const express = require("express");
const path = require("path");
const app = express();

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// User Routes
const homeRoutes = require("./routes/homeRoutes");
app.use("/", homeRoutes);

// Admin Routes
const adminRoutes=require("./routes/adminRoutes");
app.use("/admin",adminRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
