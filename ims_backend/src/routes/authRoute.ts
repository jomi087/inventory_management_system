import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthRepository } from '../repositories/AuthRepository';
import { AuthServiceV1 } from '../services/AuthService';
import { loginSchema } from '../validation/auth/loginSchema';
import { validateRequest } from '../middleware/validateRequest';

const authRepository = new AuthRepository();
const authService = new AuthServiceV1(authRepository)
const authController = new AuthController(authService)


const router = Router();

router.post('/login', validateRequest(loginSchema), authController.login);

export default router;
