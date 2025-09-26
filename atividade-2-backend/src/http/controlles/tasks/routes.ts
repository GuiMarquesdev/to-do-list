import { FastifyInstance } from "fastify";
import { createTask } from "./create-task";
import { listTasks } from "./list-tasks"; // Novo
import { updateTask } from "./update-task"; // Novo
import { deleteTask } from "./delete-task"; // Novo

export async function tasksRoutes(app: FastifyInstance) {
  app.post("/", createTask);
  app.get("/", listTasks); // Nova rota para listar
  app.put("/:id", updateTask); // Nova rota para atualizar, com parâmetro de ID
  app.delete("/:id", deleteTask); // Nova rota para deletar, com parâmetro de ID
}
