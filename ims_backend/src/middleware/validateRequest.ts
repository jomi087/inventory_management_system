import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../constants/http_constants';

type RequestSchema = ZodType<{
    body?: unknown;
    query?: unknown;
    params?: unknown;
}>;

export const validateRequest =
    (schema: RequestSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        if (!result.success) {
            const errorMessages = result.error.issues.map((err) => err.message);
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message:
                    errorMessages[0]?.split(':')[0] ||
                    errorMessages[0] ||
                    errorMessages,
            });
        }

        if (result.data.body !== undefined) {
            req.body = result.data.body;
        }

        next();
    };
