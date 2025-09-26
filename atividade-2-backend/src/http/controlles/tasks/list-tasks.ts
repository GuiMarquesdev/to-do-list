import { FastifyReply, FastifyRequest } from "fastify";
import { makeListTasksService } from "../../../services/factore/makeTaskServices";

export async function listTasks(request: FastifyRequest, reply: FastifyReply) {
  const listTasksService = makeListTasksService();
  const { tasks } = await listTasksService.execute();
  return reply.status(200).send({ tasks });
}
