import { Request, Response } from "express";
import { TaskUseCase } from "../../../task/application/taskUseCase";
import { HttpResponse } from "../utils/validation.response";

export class TaskController {
  constructor(
    private readonly taskUseCase: TaskUseCase,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  public create = async (req: Request, res: Response): Promise<any> => {
    try {
      const { body } = req;
      const task = await this.taskUseCase.create(body);

      return this.httpResponse.Ok(res, task);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  };
}
