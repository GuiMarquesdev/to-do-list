import { Task, Prisma } from "@prisma/client";
import { TasksRepository } from "../repositories/tasks-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface UpdateTaskRequest {
  id: string;
  data: Prisma.TaskUpdateInput;
}
interface UpdateTaskResponse {
  task: Task;
}

export class UpdateTaskService {
  constructor(private tasksRepository: TasksRepository) {}
  async execute({ id, data }: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const existingTask = await this.tasksRepository.findById(id);
    if (!existingTask) {
      throw new ResourceNotFoundError();
    }
    const updatedTask = await this.tasksRepository.update(id, data);
    return { task: updatedTask };
  }
}
