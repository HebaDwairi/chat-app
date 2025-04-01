import express from 'express';
import authRouter from './routes/authRoute.js';
import messageRouter from './routes/messageRoute.js';
import requestLogger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use(errorHandler);


app.listen(3001, () => {
  console.log('server running on port 3001');
});

