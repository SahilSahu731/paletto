import express from 'express';
import { extractColors } from '../controllers/paletteController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/extract', protect, upload.single('image'), extractColors);

export default router;
