import { GraphQLError } from "graphql";

export const createComment = async (prisma, user, input) => {
  const content = input.content?.trim();

  if (!content) {
    throw new GraphQLError("Comment content is required", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  const post = await prisma.post.findUnique({ where: { id: input.postId } });
  if (!post) {
    throw new GraphQLError("Post not found", {
      extensions: { code: "NOT_FOUND" },
    });
  }

  return prisma.comment.create({
    data: {
      content,
      postId: input.postId,
      authorId: user.id,
    },
  });
};
