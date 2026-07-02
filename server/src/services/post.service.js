import { GraphQLError } from "graphql";

export const listPosts = (prisma) =>
  prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

export const getPostById = async (prisma, id) => {
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    throw new GraphQLError("Post not found", {
      extensions: { code: "NOT_FOUND" },
    });
  }

  return post;
};

export const createPost = async (prisma, user, input) => {
  const title = input.title?.trim();
  const content = input.content?.trim();

  if (!title || !content) {
    throw new GraphQLError("Title and content are required", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  return prisma.post.create({
    data: {
      title,
      content,
      authorId: user.id,
    },
  });
};
