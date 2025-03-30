import express from 'express';
import { login, logout, register, getMe } from '../controllers/authController.js';
import protect from '../middleware/protect.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);
router.get('/me', protect, getMe);

export default router;