import { IUserEntity } from "./user.entity";

export class UserValue implements IUserEntity {
  email: string;
  password: string;

  constructor(user: IUserEntity) {
    this.email = user.email;
    this.password = user.password;
  }
}
