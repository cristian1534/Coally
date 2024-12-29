import { Request, Response } from "express";
import { HttpResponse } from "../../../task/infrastructure/utils/validation.response";
import { UserUseCase } from "../../application/userUseCase";
import { createToken } from "../../../user/utils/token.creator";
import bcryptjs from "bcryptjs";

export class UserController {
  constructor(
    private readonly userUseCase: UserUseCase,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  public create = async (req: Request, res: Response): Promise<any> => {
    try {
      const { body } = req;

      const existsUser = await this.userUseCase.getByEmail(body.email);
      if (existsUser) {
        return this.httpResponse.BadRequest(res, "Email already exists");
      }

      const hashedPassword = await bcryptjs.hash(body.password, 10);
      
      body.password = hashedPassword;
      const user = await this.userUseCase.create(body);

      if (!user) {
        return this.httpResponse.BadRequest(res, "User not created");
      }

      return this.httpResponse.Ok(res, user);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  };

  public login = async (req: Request, res: Response): Promise<any> => {
    try {
      const { body } = req;
      const user = await this.userUseCase.getByEmail(body.email);

      if (!user) {
        return this.httpResponse.NotFound(res, "User not found");
      }

      const isPasswordValid = await bcryptjs.compare(
        body.password,
        user.password
      );
      if (!isPasswordValid) {
        return this.httpResponse.BadRequest(res, "Invalid Credentials");
      }
      const token = await createToken(user);

      return this.httpResponse.Ok(res, token);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  };

  public get = async (req: Request, res: Response): Promise<any> => {
    try {
      const users = await this.userUseCase.get();
      if (!users) {
        return this.httpResponse.NotFound(res, "Users not found");
      }

      return this.httpResponse.Ok(res, users);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  };

  public getByEmail = async (req: Request, res: Response): Promise<any> => {
    try {
      const { email } = req.params;
      const user = await this.userUseCase.getByEmail(email);

      if (!user) {
        return this.httpResponse.NotFound(res, "User not found");
      }

      return this.httpResponse.Ok(res, user);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  };
}
