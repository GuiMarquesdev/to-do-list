import { TaskHistory } from "@prisma/client";
import { TaskHistoryRepository } from "../../repositories/task-history-repository";

interface FetchTaskHistoryRequest {
  taskId?: string;
}

interface FetchTaskHistoryResponse {
  history: TaskHistory[];
}

export class FetchTaskHistoryService {
  constructor(private taskHistoryRepository: TaskHistoryRepository) {}

  async execute({
    taskId,
  }: FetchTaskHistoryRequest): Promise<FetchTaskHistoryResponse> {
    let history: TaskHistory[];

    if (taskId) {
      history = await this.taskHistoryRepository.findByTaskId(taskId);
    } else {
      history = await this.taskHistoryRepository.listAll();
    }

    return { history };
  }
}
