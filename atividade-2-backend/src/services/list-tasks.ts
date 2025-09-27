import { Task } from "@prisma/client";
import { TasksRepository } from "../repositories/tasks-repository";

interface ListTasksResponse {
  tasks: Task[];
}

export class ListTasksService {
  constructor(private tasksRepository: TasksRepository) {}
  async execute(): Promise<ListTasksResponse> {
    const tasks = await this.tasksRepository.list();
    return { tasks };
  }
}
