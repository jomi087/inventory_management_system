import UserModel from '../models/userModel';
import { User } from '../types/user';
import { IAuthRepository } from './AuthRepositoryInterface';

export class AuthRepository implements IAuthRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email }).select('+password');
        if (!user) return null;
        return {
            id: user._id.toString(),
            email: user.email,
            password: user.password,
        };
    }
}