import { PrismaTaskRepository } from "../../repositories/prisma/prisma-taskrepository";
import { PrismaTaskHistoryRepository } from "../../repositories/prisma/prisma-task-history-repository";
import { CreateTaskService } from "../create-task";
import { ListTasksService } from "../list-tasks";
import { UpdateTaskService } from "../update-task";
import { DeleteTaskService } from "../delete-task";
import { CreateTaskHistoryService } from "../create-task-history"; // importa o novo serviço de histórico

export function makePrismaTaskHistoryRepository() {
  return new PrismaTaskHistoryRepository();
}

export function makeCreateTaskHistoryService() {
  const taskHistoryRepository = makePrismaTaskHistoryRepository();
  return new CreateTaskHistoryService(taskHistoryRepository);
}

export function makeCreateTaskService() {
  const tasksRepository = new PrismaTaskRepository();
  return new CreateTaskService(tasksRepository);
}

export function makeListTasksService() {
  const tasksRepository = new PrismaTaskRepository();
  return new ListTasksService(tasksRepository);
}

export function makeUpdateTaskService() {
  const tasksRepository = new PrismaTaskRepository();
  return new UpdateTaskService(tasksRepository);
}

export function makeDeleteTaskService() {
  const tasksRepository = new PrismaTaskRepository();
  return new DeleteTaskService(tasksRepository);
}
