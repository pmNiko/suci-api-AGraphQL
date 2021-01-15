import { ApolloServer } from "apollo-server";
import resolvers from "../graphql/resolvers/taskResolvers";
import typeDefs from "../graphql/schema/typeDefs";

const server = new ApolloServer({ typeDefs, resolvers });

export default server;
