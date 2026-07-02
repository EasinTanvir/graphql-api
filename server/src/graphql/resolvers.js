import { AuthController } from "../controllers/auth.controller.js";
import { CommentController } from "../controllers/comment.controller.js";
import { PostController } from "../controllers/post.controller.js";

export const resolvers = {
  Query: {
    me: (_parent, _args, context) => context.user,
    posts: PostController.posts,
    post: PostController.post,
  },

  Mutation: {
    register: AuthController.register,
    login: AuthController.login,
    createPost: PostController.createPost,
    createComment: CommentController.createComment,
  },

  User: {
    posts: (parent, _args, context) =>
      context.prisma.post.findMany({ where: { authorId: parent.id } }),
    comments: (parent, _args, context) =>
      context.prisma.comment.findMany({ where: { authorId: parent.id } }),
  },

  Post: {
    author: (parent, _args, context) =>
      context.prisma.user.findUnique({ where: { id: parent.authorId } }),
    comments: (parent, _args, context) =>
      context.prisma.comment.findMany({
        where: { postId: parent.id },
        orderBy: { createdAt: "asc" },
      }),
  },

  Comment: {
    author: (parent, _args, context) =>
      context.prisma.user.findUnique({ where: { id: parent.authorId } }),
    post: (parent, _args, context) =>
      context.prisma.post.findUnique({ where: { id: parent.postId } }),
  },
};
