import express from 'express';
import { login, logout, register, getMe } from '../controllers/authController.js';

const router = express.Router();

router.get('/login', login);
router.get('/logout', logout);
router.get('/register', register);
router.get('/me', getMe);

export default router;