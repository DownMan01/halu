require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const apiRoutes = require("../routes/api");

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.send("✅ NoteDrop API is running on Vercel...");
});
app.use("/api", apiRoutes);

// ✅ Correctly export the app for Vercel
module.exports = app;
