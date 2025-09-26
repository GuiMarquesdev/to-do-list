import { TaskHistoryRepository } from "../repositories/prisma-task-history-repository";
import { TaskHistory } from "@prisma/client";

type ActionType = "CREATED" | "UPDATED" | "DELETED" | "TOGGLED";

interface CreateTaskHistoryRequest {
  taskId: string;
  action: ActionType;
  taskText: string;
}

interface CreateTaskHistoryResponse {
  taskHistory: TaskHistory;
}

export class CreateTaskHistoryService {
  constructor(private taskHistoryRepository: TaskHistoryRepository) {}

  async execute({
    taskId,
    action,
    taskText,
  }: CreateTaskHistoryRequest): Promise<CreateTaskHistoryResponse> {
    const historyEntryText = `${action}: ${taskText}`;

    const taskHistory = await this.taskHistoryRepository.create({
      taskId,
      ext: historyEntryText,
    });

    return { taskHistory };
  }
}
