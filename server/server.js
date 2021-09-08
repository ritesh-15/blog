import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connection } from "./db.js";
import authRouter from "./routes/auth-routes.js";
import fileRouter from "./routes/file-routes.js";
import cookieParser from "cookie-parser";

config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  })
);

app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(express.json());

connection();

app.use("/api", authRouter);
app.use("/api", fileRouter);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
