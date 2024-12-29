import { IUserEntity } from "./user.entity";

export interface UserRepository {
  create(user: IUserEntity): Promise<IUserEntity | null>;
  get(): Promise<IUserEntity[]>;
  getByEmail(email: string): Promise<IUserEntity | null>;
}
