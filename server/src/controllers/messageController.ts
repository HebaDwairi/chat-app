import { Request, Response, NextFunction } from "express";
import prisma from '../db/prisma.js';

export const sendMessage = async (request: Request, response: Response, next: NextFunction) => {
  try {

    if(!request.user) {
      response.status(401).json({error: 'unauthorized'});
      return;
    }

    const senderId = request.user.id;
    const receiverId = request.params.id;
    const messageContent = request.body;

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
        }
      }
    });


    if(!conversation) {
      response.status(200).json([]);
      return;
    }
    
    response.status(200).json(conversation.messages);
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

    response.status(200).json(conversations);
  }
  catch (error) {
    next(error);
  }
}


export const searchUsers = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { query, page=1, limit=15 } = request.query;

    if(!request.user) {
      response.status(401).json({error: 'unauthorized'});
      return;
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { fullName: { contains: query as string, mode: 'insensitive' } },
          { username: { contains: query as string, mode: 'insensitive' } },
        ],
        NOT: { id: request.user.id }
      },
      take: Number(limit),
      skip: Number(limit) * (Number(page) - 1), 
      select: {
        id: true,
        fullName: true,
        profilePicture: true,
      }
    });
    
    response.status(200).json(users);
  }
  catch (error) {
    next(error);
  }
}