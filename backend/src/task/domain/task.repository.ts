import { ITaskEntity } from "./task.entity";

export interface TaskRepository {
  create(task: ITaskEntity): Promise<ITaskEntity| null>;
  get(): Promise<ITaskEntity[]>;
  update(id: string, task: ITaskEntity): Promise<ITaskEntity| null>;
  getById(id: string): Promise<ITaskEntity | null>;
  delete(id: string): Promise<ITaskEntity | null>;
}
