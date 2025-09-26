import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeUpdateTaskService } from "../../../services/factore/makeTaskServices";
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error";

export async function updateTask(request: FastifyRequest, reply: FastifyReply) {
  const updateTaskParamsSchema = z.object({ id: z.string().cuid() });
  const updateTaskBodySchema = z.object({
    text: z.string().min(1).optional(),
    completed: z.boolean().optional(),
  });
  const { id } = updateTaskParamsSchema.parse(request.params);
  const data = updateTaskBodySchema.parse(request.body);
  try {
    const updateTaskService = makeUpdateTaskService();
    const { task } = await updateTaskService.execute({ id, data });
    return reply.status(200).send({ task });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
