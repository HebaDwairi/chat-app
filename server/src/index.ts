import express from 'express';
import usersRouter from './routes/usersRoute.js';
import messageRouter from './routes/messageRoute.js';
import requestLogger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';

import { server, app } from '../socket/socket.js';

import dotenv from 'dotenv';
dotenv.config();


app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use('/api/users', usersRouter);
app.use('/api/messages', messageRouter);
app.use(errorHandler);


server.listen(3001, () => {
  console.log('server running on port 3001');
});

