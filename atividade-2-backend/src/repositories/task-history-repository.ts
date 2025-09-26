import { Task, Prisma } from "@prisma/client";
export interface TaskHistoryRepository {
  create(data: Prisma.TaskCreateInput): Promise<Task>;
  findById(id: string): Promise<Task | null>; // busca uma tarefa por ID
  list(): Promise<Task[]>; //Lista todas as tarefas
  update(id: string, data: Prisma.TaskUpdateInput): Promise<Task>;
  delete(id: string): Promise<void>;
}
