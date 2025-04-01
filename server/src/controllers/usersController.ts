import { NextFunction, Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const login = async (request:Request, response:Response, next: NextFunction) => {
  try {
    const { username, password} = request.body;

    if(!(username && password)) {
      response.status(400).json({
        message: 'all fields are required'
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { username }
    });

    const passwordCorrect = user? await bcrypt.compare(password, user.passwordHash) : false; 

    if(!user || !passwordCorrect) {
      response.status(400).json({
        error: 'incorrect username or password'
      });
      return;
    }
    
    generateToken(user.id, response);

    response.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePicture: user.profilePicture
    });
  }
  catch (error) {
    next(error);
  }
}

export const logout =  (request:Request, response:Response) => {
  response.cookie('jwt', '', {
    maxAge: 0,
  });

  response.status(200).json({
    message: 'logged out successfully'
  });
}

export const register =  async (request:Request, response:Response, next: NextFunction) => {
  try {
    const { firstName, lastName, username, password, confirmPassword } = request.body;

    if(!(firstName && lastName && username && password && confirmPassword)) {
      response.status(400).json({
        error: 'all fields are required'
      });
      return;
    }

    if(password !== confirmPassword) {
      response.status(400).json({
        error: "passwords don't match"
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const profilePicture = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;

    const user = await prisma.user.create({
      data: {
        fullName: `${firstName} ${lastName}`,
        username,
        profilePicture,
        passwordHash,
      }
    });
    
    generateToken(user.id, response);

    response.status(201).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePicture: user.profilePicture
    });
  }
  catch (error) {
    next(error);
  }
}

export const getMe = async (request:Request, response:Response, next: NextFunction) => {
  try {
    if(!request.user) {
      response.status(401).json({
        error: 'unauthorized'
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {id: request.user.id}
    });

    if(!user) {
      response.status(404).json({
        error: 'user not found'
      });
      return;
    }

    response.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePicture: user.profilePicture
    });
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