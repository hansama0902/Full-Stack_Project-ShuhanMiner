import express from 'express';
import { listMiners, createMiner, removeMiner, updateMiner, getMinerById } from '../db/minerController.js';

const router = express.Router();

router.get("/", listMiners);
router.post("/", createMiner);
router.put("/:id", updateMiner); 
router.delete("/:id", removeMiner);
router.get("/:id", getMinerById); 


export default router;  

