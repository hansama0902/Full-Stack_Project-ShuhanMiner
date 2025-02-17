import dotenv from "dotenv";
import debugLib from "debug";
import app from "./app.js"; // 确保 `app.js` 存在

dotenv.config(); // 读取 .env 配置
const debug = debugLib("shuhanminers:server");

// 设置端口，默认为 3000
const PORT = process.env.PORT || 3000;

// 本地运行时监听端口
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    debug(`Listening on port ${PORT}`);
  });
}

// Vercel 部署时导出 `app`
export default app;
