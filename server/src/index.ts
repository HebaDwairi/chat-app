import express from 'express';
import usersRouter from './routes/usersRoute.js';
import messageRouter from './routes/messageRoute.js';
import requestLogger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import path from 'path';

import { server, app } from './socket/socket.js';

import dotenv from 'dotenv';
dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use('/api/users', usersRouter);
app.use('/api/messages', messageRouter);
app.use(errorHandler);


if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/dist')));

  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
}


server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

