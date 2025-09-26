import { FastifyInstance } from "fastify";
import { createTask } from "./create-task";
import { listTasks } from "./list-tasks";
import { updateTask } from "./update-task";
import { deleteTask } from "./delete-task";
import { fetchTaskHistory } from "./fetch-task-history";

export async function tasksRoutes(app: FastifyInstance) {
  app.post("/", createTask);
  app.get("/", listTasks); // Nova rota para listar
  app.put("/:id", updateTask); // Nova rota para atualizar, com parâmetro de ID
  app.delete("/:id", deleteTask);

  app.get("/:id/history", fetchTaskHistory); // novo endpoint: GET /tasks/:id/history
}
