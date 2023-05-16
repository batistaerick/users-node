import { Router } from 'express';
import authentication from './authenticationRouter';
import users from './userRouter';

const router = Router();

export default (): Router => {
  authentication(router);
  users(router);
  return router;
};
