import { ObjectId } from 'mongodb';
import connectDB from './database.js';

// 获取所有矿机
async function listMiners(req, res) {
    const db = await connectDB();
    res.json(await db.collection('miners').find().toArray());
}

// 创建矿机 ✅ 确保这个函数存在
async function createMiner(req, res) {
    const db = await connectDB();
    const newMiner = req.body;
    
    if (!newMiner.ip || !newMiner.model) {
        return res.status(400).json({ error: 'Missing required fields: ip or model' });
    }
    
    const result = await db.collection('miners').insertOne(newMiner);
    res.status(201).json({ message: 'Miner added', insertedId: result.insertedId });
}

// 删除矿机
async function removeMiner(req, res) {
    const db = await connectDB();
    const minerId = req.params.id;

    try {
        const result = await db.collection('miners').deleteOne({ _id: new ObjectId(minerId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Miner not found' });
        }

        res.json({ message: 'Miner deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the miner' });
    }
}

// ✅ 确保导出了所有方法
export { listMiners, createMiner, removeMiner };


