import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectDB() {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    return client.db('miners_data'); // ✅ 更新数据库名称以匹配 Compass 显示的名称
}

export default connectDB;
