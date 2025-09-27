import { TaskHistory } from "@prisma/client";
import { TaskHistoryRepository } from "../../repositories/task-history-repository";

type ActionType =
  | "CREATED"
  | "UPDATED"
  | "DELETED"
  | "TOGGLED"
  | "CLEAR_COMPLETED";

interface CreateTaskHistoryRequest {
  taskId: string;
  action: ActionType;
  taskText: string;
}

interface CreateTaskHistoryResponse {
  taskHistory: TaskHistory;
}

export class CreateHistoryEntryService {
  constructor(private taskHistoryRepository: TaskHistoryRepository) {}

  async execute({
    taskId,
    action,
    taskText,
  }: CreateTaskHistoryRequest): Promise<CreateTaskHistoryResponse> {
    const historyEntryMessage = `${action}: ${taskText}`;

    const taskHistory = await this.taskHistoryRepository.create({
      task: {
        connect: { id: taskId },
      },
      ext: historyEntryMessage, // NÃO ENCONTREI O SCHIMIA CERTO PARA ARUMAR O ERRO DE DIGITAÇÃO EXT PARA TEXT
    });

    return { taskHistory };
  }
}
