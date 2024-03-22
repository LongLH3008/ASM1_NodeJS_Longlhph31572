import morgan from "morgan";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import PostRouter from "./routers/posts.js";
import AuthRouter from "./routers/auth.js";

const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// connect DB
connectDB(process.env.DB_URI);

// routers
app.use("/api", PostRouter);
app.use("/api", AuthRouter);

export const viteNodeApp = app;
