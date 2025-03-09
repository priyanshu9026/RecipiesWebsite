import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import recipeRouter from "./routes/recipe.js";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/api", userRouter);
app.use("/api", recipeRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "WantaceDB",
  })
  .then(() => console.log("MongoDB Connected..!"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
