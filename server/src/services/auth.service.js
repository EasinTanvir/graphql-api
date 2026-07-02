import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import { signToken } from "../utils/jwt.js";

const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
};

export const registerUser = async (prisma, input) => {
  const name = input.name?.trim();
  const email = input.email?.trim().toLowerCase();
  const password = input.password || "";

  if (!name || !email || password.length < 6) {
    throw new GraphQLError("Name, valid email, and 6+ character password are required", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new GraphQLError("Email is already registered", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
    select: publicUserSelect,
  });

  return {
    token: signToken(user),
    user,
  };
};

export const loginUser = async (prisma, input) => {
  const email = input.email?.trim().toLowerCase();
  const password = input.password || "";

  const userWithPassword = await prisma.user.findUnique({ where: { email } });
  if (!userWithPassword) {
    throw new GraphQLError("Invalid email or password", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }

  const isValidPassword = await bcrypt.compare(password, userWithPassword.password);
  if (!isValidPassword) {
    throw new GraphQLError("Invalid email or password", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }

  const { password: _password, ...user } = userWithPassword;

  return {
    token: signToken(user),
    user,
  };
};
