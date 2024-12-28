import { ITaskEntity } from "../../task/domain/task.entity";
import { TaskRepository } from "../../task/domain/task.repository";

export class TaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(task: ITaskEntity){
    const createdTask = await this.taskRepository.create(task);
    return createdTask;
  }
}
