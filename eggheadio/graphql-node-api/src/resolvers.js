import Product from './models/product';

export const resolvers = {
  Query: {
    async allProducts() {
      return await Product.find();
    },
    async getProduct(_, { _id }) {
      return await Product.findById(_id);
    },
  },
  Mutation: {
    // Destructure the arguments to just args.input from GraphQL
    async createProduct(_, { input }) {
      return await Product.create(input);
    },
    async updateProduct(_, { _id, input }) {
      return await Product.findOneAndUpdate({ _id }, input, { new: true });
    },
    async deleteProduct(_, { _id }) {
      return await Product.findByIdAndRemove(_id);
    },
  }
}