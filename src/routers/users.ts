import { Router } from 'express';
import { getAllUsers } from '../controllers/users';
import { isAuthenticated } from '../middleware';

export default (router: Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
};
