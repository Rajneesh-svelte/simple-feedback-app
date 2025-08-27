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
  .connect(process.env.MONGODB_URL)
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

app.get("/new", (req, res) => {
  res.status(200).json({ message: "API is working!" });
});
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Rajneesh Kumar this api is working fine" });
});

app.get("/rajneesh", (req, res) => {
  res
    .status(200)
    .json({ message: "Tech Lead Rajneesh Kumar checking this api " });
});

app.get("/jenkins", (req, res) => {
  res.status(200).json({ message: "Changing to test that its working  " });
});

app.get("/newapi", (req, res) => {
  res
    .status(200)
    .json({
      message: "Rajneesh kumar this is last testing thing that you have to do ",
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
