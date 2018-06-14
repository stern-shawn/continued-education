export const resolvers = {
  Query: {
    // inputs: root, args, context, info 
    hello(root, { msg }, context, info) {
      return msg;
    }
  }
}