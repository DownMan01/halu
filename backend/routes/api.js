const express = require("express");
const router = express.Router();
const db = require("../db"); // Ensure db.js is properly configured

// Middleware to handle async errors (avoids try-catch in every route)
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// ✅ Add a new airdrop
router.post("/add", asyncHandler(async (req, res) => {
    const { image, name, status, chain, cost, backers, stage } = req.body;

    // Validate required fields
    if (!image || !name || !status || !chain || !cost || !backers || !stage) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = `
        INSERT INTO airdrops (image, name, status, chain, cost, backers, stage) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [image, name, status, chain, cost, backers, stage]);

    res.status(201).json({ message: "Airdrop added successfully", id: result.insertId });
}));

// ✅ Fetch all airdrops
router.get("/", asyncHandler(async (req, res) => {
    const [rows] = await db.query("SELECT * FROM airdrops ORDER BY id ASC");
    res.json(rows);
}));

// ✅ Fetch a single airdrop by ID
router.get("/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("Fetching project with ID:", id);

    const [rows] = await db.query("SELECT * FROM airdrops WHERE id = ?", [id]);

    if (rows.length === 0) {
        console.log("❌ Project not found for ID:", id);
        return res.status(404).json({ error: "Project not found" });
    }

    console.log("✅ Project found:", rows[0]);
    res.json(rows[0]);
}));

// ✅ Handle invalid routes
router.use((req, res) => {
    res.status(404).json({ error: "API route not found" });
});

module.exports = router;
