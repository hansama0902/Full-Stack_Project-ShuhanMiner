import express from 'express';
import {
  listPrices,
  createPrice,
  removePrice,
  updatePrice,
} from '../db/priceController.js';
const router = express.Router();

// 🔹 Get all electricity prices
router.get('/', listPrices);

// 🔹 Add new electricity price
router.post('/', createPrice);

// 🔹 Update the latest electricity price
router.put('/latest', updatePrice);
// 🔹 Delete the latest electricity price
router.delete('/latest', removePrice);

export default router;
