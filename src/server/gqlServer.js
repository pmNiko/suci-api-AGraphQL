import { ApolloServer } from "apollo-server";
import resolvers from "../graphql/resolvers";
import typeDefs from "../graphql/schema/typeDefs";

const corsOptions = {
  origin: "*",
  credentials: true,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: corsOptions,
});

// const server = new ApolloServer({ typeDefs, resolvers });

export default server;
