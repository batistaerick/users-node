import { Request, Response } from 'express';
import { deleteUserById, getUserById, getUsers } from '../db/users';

export async function getAllUsers(request: Request, response: Response) {
  try {
    const users = await getUsers();

    return response.status(200).json(users);
  } catch (error) {
    console.error(error);
    return response.sendStatus(400);
  }
}

export async function deleteUser(request: Request, response: Response) {
  try {
    const { id } = request.params;

    const deletedUser = await deleteUserById(id);

    return response.json(deletedUser);
  } catch (error) {
    console.error(error);
    return response.sendStatus(400);
  }
}

export async function updateUser(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const { username } = request.body;

    if (!username) {
      return response.sendStatus(400);
    }
    const user = await getUserById(id);
    user?.username = username;

    await user?.save();

    return response.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return response.sendStatus(400);
  }
}
