import { Prisma, Task } from "@prisma/client";
import { TasksRepository } from "../tasks-repository"; // CORREÇÃO: Importa a interface correta
import { prisma } from "../../lib/prisma";

export class PrismaTaskRepository implements TasksRepository {
  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    const task = await prisma.task.create({
      data,
    });
    return task;
  }
  async findById(id: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: { id },
    });
    return task;
  }
  async list(): Promise<Task[]> {
    const tasks = await prisma.task.findMany();
    return tasks;
  }
  async update(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
    const task = await prisma.task.update({
      where: { id },
      data,
    });
    return task;
  }
  async delete(id: string): Promise<void> {
    await prisma.task.delete({
      where: { id },
    });
  }
}
