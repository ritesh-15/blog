import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connection } from "./db.js";
import authRouter from "./routes/auth-routes.js";
import fileRouter from "./routes/file-routes.js";
import cookieParser from "cookie-parser";
import postRouter from "./routes/post-routes.js";
import { Server } from "socket.io";

config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    credentials: true,
    methods: ["GET", "POST"],
  })
);

app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/storage", express.static("storage"));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

connection();

app.use("/api", authRouter);
app.use("/api", fileRouter);
app.use("/api", postRouter);

const server = app.listen(PORT, () => console.log(`Server started on ${PORT}`));

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_BASE_URL,
  },
});

io.on("connection", (socket) => {
  let roomId;
  socket.on("join-blog", (id) => {
    roomId = id;
    socket.join(id);
  });
  socket.on("new-comment", (comment) => {
    io.to(roomId).emit("comment", comment);
  });
});
