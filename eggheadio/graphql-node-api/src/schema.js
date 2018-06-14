import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = `
  type Query {
    hello(msg: String!): String!
    greet: String
  }
`;

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});