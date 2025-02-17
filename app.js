import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors"; 
import minerRoutes from "./routes/minerRoutes.js";
import priceRoutes from "./routes/priceRoutes.js";

const app = express();


app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));


app.use("/api/miners", minerRoutes);
app.use("/api/prices", priceRoutes);


app.use((req, res, next) => {
  next(createError(404, "Resource not found"));
});


app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

export default app;

