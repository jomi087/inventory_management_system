import UserModel from '../models/userModel';
import { AuthRepositoryInterface } from './AuthRepositoryInterface';

export class AuthRepository implements AuthRepositoryInterface{
    async findByEmail(email: string) {
    return UserModel.findOne({ email }).select('+password');
  }
}

