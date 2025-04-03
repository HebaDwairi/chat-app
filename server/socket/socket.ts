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
  console.log('userconnexted')

  if(userId) {
    socketMap[userId] = socket.id;
  }

  socket.emit('getOnlineUsers', Object.keys(socketMap));

  socket.on('disconnect', () => {
    console.log('userdisconnected')
    delete socketMap[userId];
    socket.emit('getOnlineUsers', Object.keys(socketMap));
  });
});


export {
  app,
  io,
  server
};