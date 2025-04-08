import { Request, Response, NextFunction } from "express";
import prisma from '../db/prisma.js';
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (request: Request, response: Response, next: NextFunction) => {
  try {

    if(!request.user) {
      response.status(401).json({error: 'unauthorized'});
      return;
    }

    const senderId = request.user.id;
    const receiverId = request.params.id;
    const messageContent = request.body.content;

    let conversation = await prisma.conversation.findFirst({
      where: {
        participants: {
          every: {
            userId: {in: [senderId, receiverId]}
          }
        }
      }
    });

    if(!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participants: {
            create: [
              { userId: senderId },
              { userId: receiverId },
            ]
          }
        }
      })
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        content: messageContent,
        conversationId: conversation.id,
      }
    });

    await prisma.conversation.update({
      where: {
        id: conversation.id,
      },
      data: {
        messages: {
          connect: {
            id: newMessage.id,
          }
        }
      }
    });

    const receiverSocketId = getReceiverSocketId(receiverId);
    const senderSocketId = getReceiverSocketId(senderId);

    if(receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
      
    }

    response.status(201).json(newMessage);
  }
  catch (error) {
    next(error);
  }
}


export const getMessages = async (request: Request, response: Response, next: NextFunction) => {
  try {
    if(!request.user) {
      response.status(401).json({error: 'unauthorized'});
      return;
    }

    const senderId = request.user.id;
    const receiverId = request.params.id;


    let conversation = await prisma.conversation.findFirst({
      where: {
        participants: {
          every: {
            userId: {in: [senderId, receiverId]}
          }
        }
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          }
        },
        participants: {
          include: {
            user: true,
          }
        }
      },
    });

    const sender = conversation?.participants.find(participant => participant.userId === senderId)?.user;
    const receiver = conversation?.participants.find(participant => participant.userId === receiverId)?.user;


    if(!conversation) {
      response.status(200).json({});
      return;
    }
    
    response.status(200).json({
      sender,
      receiver,
      messages: conversation.messages
    });
  }
  catch (error) {
    next(error);
  }
}

export const getChats = async (request: Request, response: Response, next: NextFunction) => {
  try {
    if(!request.user) {
      response.status(401).json({error: 'unauthorized'});
      return;
    }

    const currentUserId = request.user.id;


    const conversations = await prisma.conversation.findMany({
      where:{
        participants: {
          some: { userId: currentUserId }
        }
      },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        participants: {
          where: { userId: { not: currentUserId } },
          select: {
            user: {
              select: {
                fullName: true,
                id: true,
                profilePicture: true,
              }
            }
          }
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            content: true,
            createdAt: true,
            senderId: true,
          }
        }
      }
    });

    const chats = conversations.map(e => {
      return {
        user: e.participants[0].user,
        message: e.messages[0],
      }
    });

    response.status(200).json(chats);
  }
  catch (error) {
    next(error);
  }
}
