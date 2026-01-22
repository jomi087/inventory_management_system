import { NextFunction, Request, Response } from 'express';
import { SUCCESS_MESSAGES } from '../messages/success_messages';
import { HTTP_STATUS } from '../constants/http_constants';

import { IAuthService } from '../services/AuthServiceInterface';
import { loginRequest } from '../validation/auth/loginSchema';

export class AuthController {
    constructor(private readonly _authService: IAuthService) {}

    login = async (
        req: Request<{}, {}, loginRequest>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { email, password } = req.body;

            const token = await this._authService.login(email, password);

            res.status(HTTP_STATUS.OK).json({
                message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
                token,
            });
        } catch (error) {
            next(error);
        }
    };
}
