import express from 'express';
import { login, logout, register, getMe, searchUsers } from '../controllers/usersController.js';
import protect from '../middleware/protect.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);
router.get('/me', protect, getMe);
router.get('/search', protect, searchUsers);

export default router;