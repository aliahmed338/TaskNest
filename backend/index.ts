import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import { connectToDatebase } from "./config/dbConnect";
import errorMiddleware from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

import cookieParser from "cookie-parser";

// connect to database
connectToDatebase();

const app = express();

//middleare
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", taskRoutes);

//Error middleare
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
