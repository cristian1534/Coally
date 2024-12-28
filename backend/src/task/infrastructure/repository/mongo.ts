import { ITaskEntity } from "../../../task/domain/task.entity";
import { TaskRepository } from "../../../task/domain/task.repository";
import Task from "../models/task";

export class MongoRepository implements TaskRepository {
  async create(task: ITaskEntity): Promise<any> {
    const newTask = new Task(task);
    await newTask.save();
    return newTask;
  }
}
