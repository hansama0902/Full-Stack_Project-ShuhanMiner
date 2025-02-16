import express from "express";
import connectDB from "../db/database.js"; // ✅ 确保路径正确

const router = express.Router();

// ✅ 定义 `/api/prices` 端点
router.get("/", async (req, res) => {
    try {
        const db = await connectDB(); // 确保连接数据库
        const prices = await db.collection("electricity_prices").find().toArray();

        if (!prices || prices.length === 0) {
            return res.status(404).json({ error: "⚠️ 没有数据" });
        }

        res.json(prices);
    } catch (error) {
        console.error("❌ 获取电价数据失败:", error);
        res.status(500).json({ error: "服务器错误" });
    }
});

export default router;



