import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";
import sequelize from "./db";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware
app.use(errorHandler);

// Sync the database models before starting the server
// sequelize
//   .sync()
//   .then(() => {
//     console.log("Database synchronized.");
//   })
//   .catch((err) => {
//     console.error("Error synchronizing database:", err);
//   });

export default app;
