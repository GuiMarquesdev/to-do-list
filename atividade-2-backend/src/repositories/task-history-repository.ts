import { TaskHistory, Prisma } from "@prisma/client";

export interface TaskHistoryRepository {
  // A tipagem de 'data' agora espera 'message' em vez de 'text' ou 'ext'
  create(data: Prisma.TaskHistoryCreateInput): Promise<TaskHistory>;

  findByTaskId(taskId: string): Promise<TaskHistory[]>;

  listAll(): Promise<TaskHistory[]>;
}
