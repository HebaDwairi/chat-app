import { NextFunction, Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const login =  (request:Request, response:Response) => {
  response.send('login');
}

export const logout =  (request:Request, response:Response) => {
  response.send('logout');
}

export const register =  async (request:Request, response:Response, next: NextFunction) => {
  try {
    const { firstName, lastName, username, password, confirmPassword } = request.body;

    if(!(firstName && lastName && username && password && confirmPassword)) {
      response.status(400).json({
        message: 'all fields are required'
      });
    }

    if(password !== confirmPassword) {
      response.status(400).json({
        message: "passwords don't match"
      });
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

    if(user) {
      generateToken(user.id, response);

      response.status(201).json({
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        profilePicture: user.profilePicture
      });
    }
    else {
      response.status(400).json( {error: 'invalid data' });
    }
  }
  catch (error) {
    next(error);
  }
}

export const getMe =  (request:Request, response:Response) => {
  response.send('my info');
}