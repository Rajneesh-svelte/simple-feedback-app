// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Feedback = require("./models/Feedback");

dotenv.config();
const app = express();
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.post("/feedback", async (req, res) => {
  try {
    const { name, message } = req.body;
    const feedback = new Feedback({ name, message });
    await feedback.save();
    res.status(201).json({ message: "Feedback saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
