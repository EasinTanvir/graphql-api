import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import { getUserFromRequest } from "./middlewares/auth.js";
import { resolvers } from "./graphql/resolvers.js";
import { typeDefs } from "./graphql/typeDefs.js";
import { prisma } from "./utils/prisma.js";

const app = express();
const port = process.env.PORT || 4000;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await apolloServer.start();

app.use(
  "/graphql",
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
  express.json(),
  expressMiddleware(apolloServer, {
    context: async ({ req }) => ({
      prisma,
      user: await getUserFromRequest(req, prisma),
    }),
  }),
);

app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}/graphql`);
});
