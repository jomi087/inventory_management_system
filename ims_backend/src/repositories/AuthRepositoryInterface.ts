export interface AuthRepositoryInterface {
  findByEmail(email: string): Promise<any>;
}