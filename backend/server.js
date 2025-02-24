require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("NoteDrop API is running...");
});

const apiRoutes = require("./routes/api")
app.use("/api", apiRoutes)

// Routes
const airdropRoutes = require("./routes/api"); // Make sure this path is correct
app.use("/api", airdropRoutes); // Correctly using the router

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
