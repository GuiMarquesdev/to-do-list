import { PrismaTaskRepository } from "../../repositories/prisma/prisma-taskrepository";
import { CreateTaskService } from "../create-task";
import { ListTasksService } from "../list-tasks";
import { UpdateTaskService } from "../update-task";
import { DeleteTaskService } from "../delete-task";

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
