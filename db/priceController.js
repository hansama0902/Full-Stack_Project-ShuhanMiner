import connectDB from './database.js';

async function listPrices(req, res) {
  try {
    const db = await connectDB();
    const prices = await db.collection('electricity_prices').find().toArray();
    if (!prices || prices.length === 0)
      return res.status(404).json({ error: '⚠️ No data found' });
    res.json(prices);
  } catch (error) {
    console.error('❌ Failed to fetch electricity prices:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
async function createPrice(req, res) {
  try {
    const { price } = req.body;
    if (!price || isNaN(price))
      return res.status(400).json({ error: 'Invalid price' });

    const db = await connectDB();
    await db
      .collection('electricity_prices')
      .insertOne({ price, timestamp: new Date() });

    res.json({ message: 'Price added successfully' });
  } catch (error) {
    console.error('❌ Failed to add price:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
async function removePrice(req, res) {
  try {
    const db = await connectDB();
    const latestPrice = await db
      .collection('electricity_prices')
      .find()
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray();

    if (!latestPrice.length)
      return res.status(404).json({ error: 'No price found to delete' });

    await db
      .collection('electricity_prices')
      .deleteOne({ _id: latestPrice[0]._id });

    res.json({ message: 'Latest price deleted successfully' });
  } catch (error) {
    console.error('❌ Failed to delete price:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
async function updatePrice(req, res) {
  try {
    const { price } = req.body;
    if (!price || isNaN(price))
      return res.status(400).json({ error: 'Invalid price' });

    const db = await connectDB();
    const latestPrice = await db
      .collection('electricity_prices')
      .find()
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray();

    if (!latestPrice.length)
      return res.status(404).json({ error: 'No price found to update' });

    await db
      .collection('electricity_prices')
      .updateOne({ _id: latestPrice[0]._id }, { $set: { price } });

    res.json({ message: 'Latest price updated successfully' });
  } catch (error) {
    console.error('❌ Failed to update price:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export { listPrices, createPrice, removePrice, updatePrice };
