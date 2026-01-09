import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import ms from 'ms';

export const signToken = (payload: object): string => {
    const options: SignOptions = {
        expiresIn: process.env.JWT_EXPIRES_IN as ms.StringValue,
    };

    return jwt.sign(payload, process.env.JWT_SECRET as Secret, options);
};
