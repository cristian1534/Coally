import { ITaskEntity } from "./task.entity";

export class TaskValue implements ITaskEntity {
  title: string;
  description: string;
  status?: boolean;
  createdAt: Date;

  constructor(task: ITaskEntity) {
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.createdAt = task.createdAt;
  }
}
