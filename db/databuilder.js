import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid"; // ✅ 确保正确导入 uuid

const MONGO_URI = "mongodb://localhost:27017"; // ✅ 连接 MongoDB
const DB_NAME = "miners_data";

const client = new MongoClient(MONGO_URI);

/**
 * 生成矿机数据
 */
async function generateMinersData() {
    const miners = []; // ✅ 确保 miners 是数组
    const models = ["S19", "S17", "L3+", "A10", "M30S"];
    const statuses = ["Online", "Offline"];
    const pools = ["Pool_A", "Pool_B", "Pool_C"];
    const customers = ["Customer_1", "Customer_2", "Customer_3"];

    for (let i = 0; i < 1000; i++) {
        miners.push({
            _id: uuidv4(), // ✅ 生成唯一 ID
            ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
            seat: `A${Math.floor(Math.random() * 10)}`,
            model: models[Math.floor(Math.random() * models.length)],
            workingMode: ["Normal", "Sleep"][Math.floor(Math.random() * 2)], // ✅ 修正索引范围
            hashrate: Math.floor(Math.random() * (120000 - 80000) + 80000), // Hashrate in 80k - 120k
            status: statuses[Math.floor(Math.random() * statuses.length)],
            hashboardStatus: ["Good", "Bad"][Math.floor(Math.random() * 2)], // ✅ 修正索引范围
            temperature: Math.floor(Math.random() * (90 - 50) + 50), // 温度范围 50-90°C
            fanSpeed: Math.floor(Math.random() * (6000 - 3000) + 3000), // 风扇转速 3000-6000 RPM
            customer: customers[Math.floor(Math.random() * customers.length)],
            miningPool: pools[Math.floor(Math.random() * pools.length)],
        });
    }
    return miners;
}

/**
 * 生成电价数据
 */
async function generateElectricityPrices() {
    const prices = [];
    let startTime = new Date("2024-02-01T00:00:00Z"); // ✅ 开始时间

    for (let i = 0; i < 50; i++) {
        prices.push({
            _id: i + 1,
            timestamp: startTime.toISOString(),
            price: parseFloat((Math.random() * (0.2 - 0.08) + 0.08).toFixed(4)), // ✅ 确保 price 是 number
        });

        // 时间递增 1 小时
        startTime.setHours(startTime.getHours() + 1);
    }
    return prices;
}

/**
 * 插入数据到 MongoDB
 */
async function seedDatabase() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");

        const db = client.db(DB_NAME);
        const minersCollection = db.collection("miners");
        const pricesCollection = db.collection("electricity_prices");

        // 生成数据
        const minersData = await generateMinersData();
        const pricesData = await generateElectricityPrices();

        // ✅ 先清空数据库，防止重复插入
        await minersCollection.deleteMany({});
        await pricesCollection.deleteMany({});

        // 插入数据
        await minersCollection.insertMany(minersData);
        console.log(`✅ Inserted ${minersData.length} miners into database`);

        await pricesCollection.insertMany(pricesData);
        console.log(`✅ Inserted ${pricesData.length} electricity prices into database`);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
    } finally {
        await client.close();
        console.log("🔌 Disconnected from MongoDB");
    }
}


// ✅ 运行脚本
seedDatabase();

