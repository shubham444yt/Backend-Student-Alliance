import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import userRouter from './src/router/user.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware: Apply CORS
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Include credentials if needed
}));

// Middleware: Parse JSON
app.use(express.json());

// MongoDB connection string
const MONGO_URI = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB ✅✅✅"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Use the user router
app.use("/api", userRouter);

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
