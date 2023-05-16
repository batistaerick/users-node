import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers/index';

export async function register(request: Request, response: Response) {
  try {
    const { email, password, username } = request.body;

    if (!email || !password || !username) {
      return response.sendStatus(400);
    }
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return response.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: { salt, password: authentication(salt, password) },
    });

    return response.status(201).json(user).end();
  } catch (error) {
    console.error(error);
    return response.sendStatus(400);
  }
}
