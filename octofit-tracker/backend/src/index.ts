import express from "express";
import mongoose from "mongoose";

const app = express();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/octofit";

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "octofit-backend" });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on http://localhost:${port}`);
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB:", mongoUri);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
