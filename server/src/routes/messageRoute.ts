import express from 'express';
import protect from '../middleware/protect.js';
import { sendMessage, getMessages, getChats } from '../controllers/messageController.js';

const router = express.Router();


router.post('/send/:id', protect, sendMessage);
router.get('/conversations',protect ,getChats);
router.get('/:id', protect, getMessages);


export default router;