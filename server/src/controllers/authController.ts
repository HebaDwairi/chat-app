import { Request, Response } from "express";

export const login =  (request:Request, response:Response) => {
  response.send('login');
}

export const logout =  (request:Request, response:Response) => {
  response.send('logout');
}

export const register =  (request:Request, response:Response) => {

  const { firstName, lastName, username, password, confirmPassword } = request.body;
  
}

export const getMe =  (request:Request, response:Response) => {
  response.send('my info');
}