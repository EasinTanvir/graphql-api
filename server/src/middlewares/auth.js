import { GraphQLError } from "graphql";
import { verifyToken } from "../utils/jwt.js";

export const getUserFromRequest = async (req, prisma) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return null;
  }

  try {
    const payload = verifyToken(token);
    return prisma.user.findUnique({
      where: { id: payload.userId },
    });
  } catch {
    return null;
  }
};

export const requireAuth = (user) => {
  if (!user) {
    throw new GraphQLError("Authentication required", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }

  return user;
};
