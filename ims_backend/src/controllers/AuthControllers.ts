import { NextFunction, Request, Response } from 'express';
import { SUCCESS_MESSAGES } from '../messages/success_messages';
import { HTTP_STATUS } from '../constants/http_constants';
import bcrypt from 'bcrypt';
import { AppError } from '../errors/AppError';
import { AUTH_MESSAGES } from '../messages/auth_messages';
import { signToken } from '../utils/jwt';

import { AuthServiceInterface } from '../services/AuthServiceInterface';


export class AuthControllers {
    constructor(
        private readonly _authService: AuthServiceInterface
    ) { }
    
    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            const token = await this._authService.login(email,password)

            res.status(HTTP_STATUS.OK).json({
                message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
                token,
            });
        } catch (error) {
            next(error);
        }
    };
}
