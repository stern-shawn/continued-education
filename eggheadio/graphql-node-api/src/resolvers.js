import Product from './models/product';

export const resolvers = {
  Query: {
    async allProducts() {
      return await Product.find();
    }
  },
  Mutation: {
    // Destructure the arguments to just args.input from GraphQL
    async createProduct(_, { input }) {
      return await Product.create(input);
    }
  }
}