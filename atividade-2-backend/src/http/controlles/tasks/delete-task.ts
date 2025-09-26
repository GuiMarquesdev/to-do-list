import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeDeleteTaskService } from "../../../services/factore/makeTaskServices";
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error";

export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {
  const deleteTaskParamsSchema = z.object({ id: z.string().cuid() });

  const { id } = deleteTaskParamsSchema.parse(request.params);

  try {
    const deleteTaskService = makeDeleteTaskService();
    await deleteTaskService.execute({ id });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
