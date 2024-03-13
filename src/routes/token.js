import { Router } from 'express';
import { getToken, useToken } from '../controllers/token.js';

export const tokenRouter = Router();

// POST /token/
tokenRouter.post('/', getToken);

//POST /token/use
tokenRouter.post('/use', useToken);
