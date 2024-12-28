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
      if (!task) {
        return this.httpResponse.BadRequest(res, "Task not created");
      }
      return this.httpResponse.Ok(res, task);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  };

  public get = async (req: Request, res: Response): Promise<any> => {
    try {
      const tasks = await this.taskUseCase.get();
      if (!tasks) {
        return this.httpResponse.NotFound(res, "Tasks not found");
      }

      return this.httpResponse.Ok(res, tasks);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  };

  public update = async (req: Request, res: Response): Promise<any> => {
    try {
      const { body, params } = req;

      const existTask = await this.taskUseCase.getById(params.id);
      if (!existTask) {
        return this.httpResponse.NotFound(res, "Task not found");
      }
      const task = await this.taskUseCase.update(params.id, body);
      return this.httpResponse.Ok(res, task);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  };

  public getById = async (req: Request, res: Response): Promise<any> => {
    try {
      const { params } = req;
      const task = await this.taskUseCase.getById(params.id);
      if (!task) {
        return this.httpResponse.NotFound(res, "Task not found");
      }
      return this.httpResponse.Ok(res, task);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  };
  
  public delete = async (req: Request, res: Response): Promise<any> => {
    try {
      const { params } = req;
      const task = await this.taskUseCase.delete(params.id);
      if (!task) {
        return this.httpResponse.NotFound(res, "Task not found");
      }
      return this.httpResponse.Ok(res, "Task deleted");
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  };
}
