import { Response } from "express";
import jwt from 'jsonwebtoken';

const generateToken = (id: String, response: Response) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '10d',
  });

  response.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 10 * 24 * 60 * 60 * 1000,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  })

  return token;
}

export default generateToken;