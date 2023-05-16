import { NextFunction, Request, Response } from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionToken } from '../db/users';

export async function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const sessionToken = request.cookies['ERICK-AUTH'];

    if (!sessionToken) {
      return response.sendStatus(403);
    }
    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return response.sendStatus(403);
    }
    merge(request, { identity: existingUser });

    return next();
  } catch (error) {
    console.error(error);
    return response.sendStatus(400);
  }
}

export async function isOwner(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { id } = request.params;
    const currentUserId = get(request, 'identity._id') as string | undefined;

    if (!currentUserId && currentUserId?.toString() !== id) {
      return response.sendStatus(403);
    }
    next();
  } catch (error) {
    console.error(error);
    return response.sendStatus(400);
  }
}
