import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../db/prisma.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

interface DecodedToken extends JwtPayload {
  id: string
}

const protect = async (request:Request , response: Response, next: NextFunction) => {
  try {
    const token = request.cookies.jwt;

    if(!token) {
      response.status(401).json({
        error: 'unauthorized, no token'
      });
      return;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    if(!decodedToken) {
      response.status(401).json({
        error: 'unauthorized, invalid token'
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id
      },
      select: {
        fullName: true, username: true, id:true, profilePicture: true
      }
    });

    if(!user) {
      response.status(404).json({
        error: 'user not found'
      });
      return;
    }

    request.user = user;

    next();

  }
  catch(err) {
    next(err);
  }
}

export default protect;