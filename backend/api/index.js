require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { VercelRequest, VercelResponse } = require('@vercel/node');

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

// ✅ Export handler for Vercel
module.exports = (req, res) => {
    return app(req, res);
};
