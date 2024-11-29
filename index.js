import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv"; // Fixed typo: 'dototenv' to 'dotenv'
import route from "./routes/userRoute.js";

const app = express();

// Middleware
app.use(bodyParser.json());

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 4000;
const MONGOURL = process.env.MONGO_URL;

// MongoDB Connection
mongoose
  .connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully.");
    // Start the server only after a successful database connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
  });

// Routes
app.use("/api/user", route);

// Health Check Endpoint (Optional, but helpful for debugging)
app.get("/health", (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.status(200).send("MongoDB is connected!");
  } else {
    res.status(500).send("MongoDB is not connected!");
  }
});

