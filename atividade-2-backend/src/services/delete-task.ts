import { Task } from "@prisma/client";
import { TasksRepository } from "../repositories/tasks-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteTaskRequest {
  id: string;
}

interface MensagemTexto {
  conteudo: string;
  data: Date;
}

export class DeleteTaskService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ id }: DeleteTaskRequest): Promise<MensagemTexto> {
    const existingTask = await this.tasksRepository.findById(id);

    // Se a tarefa não for encontrada, lançamos um erro.
    if (!existingTask) {
      throw new ResourceNotFoundError();
    }

    const deletedTask = await this.tasksRepository.delete(id);

    const minhaMensagem: MensagemTexto = {
      conteudo: "Task deletada!",
      data: new Date(),
    };

    return minhaMensagem;
  }
}
