import { ITaskEntity } from "./task.entity";

export interface TaskRepository {
  create(task: ITaskEntity): Promise<ITaskEntity| null>;
}
