import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectToMongoDB from "./DB/connectToMongoDB.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 8000;

dotenv.config();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow cookies and credentials
  }));
  
app.use(express.json());
app.use(cookieParser()); // Parse JSON requests

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.get('/', (req, res) => {
  res.send("Hello world!");
});

server.listen(PORT, () => {
  conectToMongoDB();
  console.log(`Server is listening on port ${PORT}`);
});