import { Router } from 'express';
import { AuthControllers } from '../controllers/AuthControllers';
import { AuthRepository } from '../repositories/AuthRepository';
import { AuthServiceV1 } from '../services/AuthService';

const authRepository = new AuthRepository();
const authService = new AuthServiceV1(authRepository)
const authControllers = new AuthControllers(authService)


const router = Router();

router.post('/login', authControllers.login);

export default router;
