import { TaskHistory } from "@prisma/client";
import { TaskHistoryRepository } from "../../repositories/task-history-repository";
import { ActionType } from "./fetch-task-history"; // CORREÇÃO: Importa ActionType do arquivo de onde ele deve vir

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
      taskId,
      message: historyEntryMessage,
    });

    return { taskHistory };
  }
}
