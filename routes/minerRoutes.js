import express from 'express';
import { listMiners, createMiner, removeMiner } from '../db/minerController.js';

const router = express.Router();

router.get('/', listMiners);
router.post('/', createMiner);
router.delete('/:id', removeMiner);

export default router;  

