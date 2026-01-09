import bcrypt from 'bcrypt';
import { AppError } from '../errors/AppError';
import { HTTP_STATUS } from '../constants/http_constants';
import { AUTH_MESSAGES } from '../messages/auth_messages';
import { signToken } from '../utils/jwt';

import { AuthRepositoryInterface } from '../repositories/AuthRepositoryInterface';
import { AuthServiceInterface } from './AuthServiceInterface';

export class AuthServiceV1 implements AuthServiceInterface {
  constructor(
    private readonly _authRepository: AuthRepositoryInterface
  ) {}

  async login(email: string, password: string): Promise<string> {

    const user = await this._authRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        AUTH_MESSAGES.USER_NOT_FOUND
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        AUTH_MESSAGES.INVALID_CREDENTIALS
      );
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
    });

    return token;
  }
}
