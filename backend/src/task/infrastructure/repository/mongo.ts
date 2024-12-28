import { ITaskEntity } from "../../../task/domain/task.entity";
import { TaskRepository } from "../../../task/domain/task.repository";
import Task from "../models/task";

export class MongoRepository implements TaskRepository {
  async create(task: ITaskEntity): Promise<any> {
    const newTask = new Task(task);
    await newTask.save();
    return newTask;
  }

  async get(): Promise<any> {
    const tasks = Task.find();
    return tasks;
  }

  async update(id: string, task: ITaskEntity): Promise<any> {
    const updatedTask = await Task.findByIdAndUpdate( id, task, {
      new: true,
      runValidators: true,
    });
    return updatedTask;
  }

  async getById(id: string): Promise<any> {
    const task = Task.findById(id);
    return task;
  }

  async delete(id: string): Promise<any> {
    const task = Task.findByIdAndDelete(id);
    return task;
  }
}
