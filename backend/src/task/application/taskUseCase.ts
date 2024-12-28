import { ITaskEntity } from "../../task/domain/task.entity";
import { TaskRepository } from "../../task/domain/task.repository";

export class TaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(task: ITaskEntity) {
    const createdTask = await this.taskRepository.create(task);
    return createdTask;
  }

  async get() {
    const tasks = await this.taskRepository.get();
    return tasks;
  }

  async update(id: string, task: ITaskEntity) {
    const updatedTask = await this.taskRepository.update(id, task);
    return updatedTask;
  }

  async getById(id: string) {
    const task = await this.taskRepository.getById(id);
    return task;
  }

  async delete(id: string) {
    const task = await this.taskRepository.delete(id);
    return task;
  }
}
