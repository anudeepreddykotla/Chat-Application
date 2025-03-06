import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from 'cors';

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

export const getRecieverSocketId = (recieverId) => {
    return userSocketMap[recieverId];
}

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log(`A new user connected: ${socket.id}`);

    const userId = socket.handshake.query.userId;
    console.log("User ID from handshake:", userId); // ✅ Debug Log

    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        if (userId && userSocketMap[userId]) {
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});

export { app, io, server };
