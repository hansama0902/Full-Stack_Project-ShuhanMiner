import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectDB() {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    return client.db('miners_data'); 
}

export default connectDB;
