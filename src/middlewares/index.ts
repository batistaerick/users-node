import { getUserBySessionToken } from 'db/users';
import { NextFunction, Request, Response } from 'express';
import { merge } from 'lodash';

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
  }
}
