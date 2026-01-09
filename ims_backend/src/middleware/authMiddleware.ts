import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { HTTP_STATUS } from '../constants/http_constants';
import jwt from 'jsonwebtoken';
import { AUTH_MESSAGES } from '../messages/auth_messages';

interface JwtPayload {
    userId: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError(
                HTTP_STATUS.UNAUTHORIZED,
                AUTH_MESSAGES.AUTH_REQUIRED
            );
        }

        if (!process.env.JWT_SECRET) {
            throw new Error(AUTH_MESSAGES.JWT_SECRET_MISSING);
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return next(
                new AppError(
                    HTTP_STATUS.UNAUTHORIZED,
                    AUTH_MESSAGES.TOKEN_MISSING
                )
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'TokenExpiredError') {
                return next(
                    new AppError(
                        HTTP_STATUS.UNAUTHORIZED,
                        AUTH_MESSAGES.TOKEN_EXPIRED
                    )
                );
            }

            if (error.name === 'JsonWebTokenError') {
                return next(
                    new AppError(
                        HTTP_STATUS.UNAUTHORIZED,
                        AUTH_MESSAGES.INVALID_TOKEN
                    )
                );
            }
        }

        next(error);
    }
};
