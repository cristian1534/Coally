import { IUserEntity } from "../../user/domain/user.entity";
import { UserRepository } from "../../user/domain/user.repository";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: IUserEntity) {
    const createdUser = await this.userRepository.create(user);
    return createdUser;
  }

  async get() {
    const users = await this.userRepository.get();
    return users;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.getByEmail(email);
    return user;
  }
}
