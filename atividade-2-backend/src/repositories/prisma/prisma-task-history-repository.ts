import { Prisma, TaskHistory } from "@prisma/client";
// Presumindo que o arquivo da interface está no caminho relativo correto
import { TaskHistoryRepository } from "../task-history-repository";
import { prisma } from "../../lib/prisma";

export class PrismaTaskHistoryRepository implements TaskHistoryRepository {
  async create(data: Prisma.TaskHistoryCreateInput): Promise<TaskHistory> {
    const taskHistory = await prisma.taskHistory.create({
      data,
    });
    return taskHistory;
  }

  async findByTaskHistoryId(taskId: string): Promise<TaskHistory[]> {
    const taskHistory = await prisma.taskHistory.findMany({
      where: { taskId },
      // Opcional: ordenar por data de criação decrescente (do mais novo para o mais antigo)
      orderBy: {
        createdAt: "desc",
      },
    });
    return taskHistory;
  }

  async listAll(): Promise<TaskHistory[]> {
    const allHistory = await prisma.taskHistory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return allHistory;
  }
}
