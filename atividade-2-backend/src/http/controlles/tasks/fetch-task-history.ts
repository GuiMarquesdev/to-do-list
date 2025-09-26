import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchTaskHistoryService } from "../../../services/factore/makeTaskServices";

export async function fetchTaskHistory(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchHistoryParamsSchema = z.object({
    id: z.string().cuid(),
  });

  try {
    const { id: taskId } = fetchHistoryParamsSchema.parse(request.params);

    const fetchTaskHistoryService = makeFetchTaskHistoryService();

    const { history } = await fetchTaskHistoryService.execute({ taskId });

    return reply.status(200).send({
      history,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: "Validation error on Task ID",
        issues: error.format(),
      });
    }

    console.error(error);
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
