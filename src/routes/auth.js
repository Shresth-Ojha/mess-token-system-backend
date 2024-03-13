import {Router} from 'express';
import { authController } from '../controllers/auth.js';

const authRouter = Router();

// POST /auth
authRouter.post('/', authController)

export default authRouter;