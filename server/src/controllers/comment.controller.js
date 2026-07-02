import { requireAuth } from "../middlewares/auth.js";
import { createComment } from "../services/comment.service.js";

export const CommentController = {
  createComment: (_parent, { input }, context) => {
    const user = requireAuth(context.user);
    return createComment(context.prisma, user, input);
  },
};
