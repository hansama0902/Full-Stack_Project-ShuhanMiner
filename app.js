import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors"; // ✅ 允许跨域访问
import minerRoutes from "./routes/minerRoutes.js";
import priceRoutes from "./routes/priceRoutes.js";

const app = express();

// ✅ 允许 CORS，防止前端访问 API 报错
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ✅ 修正静态文件路径，兼容 Vercel
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

// ✅ 定义 API 路由
app.use("/api/miners", minerRoutes);
app.use("/api/prices", priceRoutes);

// ✅ 404 处理
app.use((req, res, next) => {
  next(createError(404, "Resource not found"));
});

// ✅ 修正错误处理中间件（添加 `next` 参数，防止 Vercel 崩溃）
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

// ✅ 让 Vercel 识别 Express 服务器
export default app;

