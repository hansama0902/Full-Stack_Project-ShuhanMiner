import connectDB from "./database.js";

// **获取所有矿机**
async function listMiners(req, res) {
    try {
        const db = await connectDB();
        const miners = await db.collection("miners").find().toArray();
        res.json(miners);
    } catch (error) {
        console.error("❌ 获取矿机列表失败:", error);
        res.status(500).json({ error: "服务器错误" });
    }
}

// **创建矿机**
async function createMiner(req, res) {
    try {
        const db = await connectDB();
        let newMiner = req.body;

        if (!newMiner.ip || !newMiner.model) {
            return res.status(400).json({ error: "缺少必填字段: ip 或 model" });
        }

        // 直接使用字符串作为 _id
        if (!newMiner._id) {
            newMiner._id = `miner_${Date.now()}`; // 使用时间戳生成唯一字符串 ID
        }

        await db.collection("miners").insertOne(newMiner);
        res.status(201).json({ message: "矿机创建成功", insertedId: newMiner._id });
    } catch (error) {
        console.error("❌ 创建矿机失败:", error);
        res.status(500).json({ error: "服务器错误" });
    }
}

// **删除矿机**
async function removeMiner(req, res) {
    try {
        const db = await connectDB();
        const minerId = req.params.id;

        const result = await db.collection("miners").deleteOne({ _id: minerId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "矿机未找到" });
        }

        res.json({ message: "矿机删除成功" });
    } catch (error) {
        console.error("❌ 删除矿机失败:", error);
        res.status(500).json({ error: "服务器错误" });
    }
}

// **更新矿机**
async function updateMiner(req, res) {
    try {
        const db = await connectDB();
        const minerId = req.params.id;
        const updatedData = req.body;

        const result = await db.collection("miners").updateOne(
            { _id: minerId },
            { $set: updatedData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "矿机未找到" });
        }

        res.json({ message: "矿机更新成功", updatedCount: result.modifiedCount });
    } catch (error) {
        console.error("❌ 更新矿机失败:", error);
        res.status(500).json({ error: "服务器错误" });
    }
}

// **获取单个矿机信息**
async function getMinerById(req, res) {
    try {
        const db = await connectDB();
        const minerId = req.params.id;

        const miner = await db.collection("miners").findOne({ _id: minerId });

        if (!miner) {
            return res.status(404).json({ error: "矿机未找到" });
        }

        res.json(miner);
    } catch (error) {
        console.error("❌ 获取矿机失败:", error);
        res.status(500).json({ error: "服务器错误" });
    }
}

// **统一导出所有方法**
export { listMiners, createMiner, removeMiner, updateMiner, getMinerById };






