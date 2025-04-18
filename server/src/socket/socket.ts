import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
  }
});


const socketMap: { [key: string]: string } = {};

export const getReceiverSocketId = (receiverId: string) => {
  return socketMap[receiverId];
}

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId as string;

  if (userId) {
    socketMap[userId] = socket.id;
  }

  io.emit('getOnlineUsers', Object.keys(socketMap));
  console.log('user connected', Object.keys(socketMap));

  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete socketMap[userId];
    io.emit('getOnlineUsers', Object.keys(socketMap));
  });
});


export {
  app,
  io,
  server
}; 