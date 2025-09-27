import { TaskHistory, Prisma } from "@prisma/client";

export interface TaskHistoryRepository {
  create(data: Prisma.TaskHistoryCreateInput): Promise<TaskHistory>;

  findByTaskId(taskId: string): Promise<TaskHistory[]>;

  listAll(): Promise<TaskHistory[]>;
}
