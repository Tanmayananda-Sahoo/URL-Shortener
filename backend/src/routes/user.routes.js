import {Router} from 'express';
import { register, login, logout, verifyUser } from '../controllers/user.controllers.js';
import authenticateUser from '../middlewares/auth.middlewares.js';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(authenticateUser, logout);
router.route('/auth').get(authenticateUser, verifyUser);

export default router;