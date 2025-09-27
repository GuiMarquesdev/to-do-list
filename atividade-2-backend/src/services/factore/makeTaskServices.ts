import { PrismaTaskRepository } from "../../repositories/prisma/prisma-taskrepository";
import { PrismaTaskHistoryRepository } from "../../repositories/prisma/prisma-task-history-repository";
import { CreateTaskService } from "../create-task";
import { ListTasksService } from "../list-tasks";
import { UpdateTaskService } from "../update-task";
import { DeleteTaskService } from "../delete-task";
// CORREÇÃO: Importa os serviços de histórico do caminho correto
import { CreateHistoryEntryService } from "../task-history/create-history-entry";
import { FetchTaskHistoryService } from "../task-history/fetch-task-history";

export function makePrismaTaskHistoryRepository() {
  return new PrismaTaskHistoryRepository();
}

// CORREÇÃO: Renomeado o factory para refletir o nome da classe de serviço
export function makeCreateHistoryEntryService() {
  const taskHistoryRepository = makePrismaTaskHistoryRepository();
  return new CreateHistoryEntryService(taskHistoryRepository);
}

// CORREÇÃO: Adicionado o factory para o serviço de busca de histórico
export function makeFetchTaskHistoryService() {
  const taskHistoryRepository = makePrismaTaskHistoryRepository();
  return new FetchTaskHistoryService(taskHistoryRepository);
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
