import express from 'express';
import protect from '../middleware/protect.js';
import { sendMessage, getMessages, searchUsers, getChats } from '../controllers/messageController.js';

const router = express.Router();


router.post('/send:id', protect, sendMessage);
router.get('/:id', protect, getMessages);
router.get('/conversations', getChats);
router.get('/search', searchUsers);



export default router;