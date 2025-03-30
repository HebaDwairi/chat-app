import express from 'express';
import authRouter from './routes/authRoute.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();


app.use('/api/auth', authRouter);


app.listen(3001, () => {
  console.log('server running on port 3001');
});

