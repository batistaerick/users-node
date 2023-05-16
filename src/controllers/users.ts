import { Request, Response } from 'express';
import { getUsers } from '../db/users';

export async function getAllUsers(request: Request, response: Response) {
  try {
    const users = await getUsers();

    return response.status(200).json(users);
  } catch (error) {
    console.error(error);
    return response.sendStatus(400);
  }
}
