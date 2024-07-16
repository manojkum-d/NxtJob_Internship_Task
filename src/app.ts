import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/golbalErrorHandler";

import { config } from "./config/config";
import createHttpError from "http-errors";
import paymentRoutes from "./routes/paymentRoutes";

const app = express();

app.use(
  cors({
    origin: config.frontendDomain,
  })
);

app.use(express.json());

// Routes
// Http methods: GET, POST, PUT, PATCH, DELETE
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to NxtJob Payment Gateway" });
});

app.use("api/payments", paymentRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// app.use("/api/users", userRouter);

// Global error handler
app.use(globalErrorHandler);

export default app;
