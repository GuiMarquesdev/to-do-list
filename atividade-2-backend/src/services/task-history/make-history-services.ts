import { PrismaTaskHistoryRepository } from "../../repositories/prisma/prisma-task-history-repository";
import { CreateHistoryEntryService } from "./create-history-entry";
import { FetchTaskHistoryService } from "./fetch-task-history";
import { TaskHistoryRepository } from "../../repositories/task-history-repository";

export function makeTaskHistoryRepository(): TaskHistoryRepository {
  return new PrismaTaskHistoryRepository();
}

export function makeCreateHistoryEntryService(): CreateHistoryEntryService {
  const taskHistoryRepository = makeTaskHistoryRepository();
  return new CreateHistoryEntryService(taskHistoryRepository);
}

export function makeFetchTaskHistoryService(): FetchTaskHistoryService {
  const taskHistoryRepository = makeTaskHistoryRepository();
  return new FetchTaskHistoryService(taskHistoryRepository);
}
