import { Prisma, TaskHistory } from "@prisma/client";
import { TaskHistoryRepository } from "../task-history-repository";
import { prisma } from "../../lib/prisma";
export class PrismaTaskHistoryRepository implements TaskHistoryRepository {
  async create(data: Prisma.TaskHistoryCreateInput): Promise<TaskHistory> {
    const taskHistory = await prisma.taskHistory.create({
      data,
    });
    return taskHistory;
  }

  async findByTaskId(taskId: string): Promise<TaskHistory[]> {
    const taskHistory = await prisma.taskHistory.findMany({
      where: { taskId },

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
