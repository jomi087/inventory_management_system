import { User } from "../types/user";

export interface AuthRepositoryInterface {
  findByEmail(email: string):  Promise<User | null> ;
}