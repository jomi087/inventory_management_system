import { User } from "../types/user";

export interface IAuthRepository {
  findByEmail(email: string):  Promise<User | null> ;
}