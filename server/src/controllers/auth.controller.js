import { loginUser, registerUser } from "../services/auth.service.js";

export const AuthController = {
  register: (_parent, { input }, context) => registerUser(context.prisma, input),
  login: (_parent, { input }, context) => loginUser(context.prisma, input),
};
