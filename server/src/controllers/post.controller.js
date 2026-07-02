import { requireAuth } from "../middlewares/auth.js";
import { createPost, getPostById, listPosts } from "../services/post.service.js";

export const PostController = {
  posts: (_parent, _args, context) => listPosts(context.prisma),
  post: (_parent, { id }, context) => getPostById(context.prisma, id),
  createPost: (_parent, { input }, context) => {
    const user = requireAuth(context.user);
    return createPost(context.prisma, user, input);
  },
};
