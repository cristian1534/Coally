import { UserRepository } from "../../../user/domain/user.repository";
import { IUserEntity } from "../../../user/domain/user.entity";
import User from "../models/user";

export class MongoRepository implements UserRepository {
  async create(user: IUserEntity): Promise<IUserEntity | null> {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
  }

  async get(): Promise<IUserEntity[]> {
    const users = User.find();
    return users;
  }
}
