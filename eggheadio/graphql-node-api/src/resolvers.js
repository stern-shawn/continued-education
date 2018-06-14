const products = [
  {
    _id: '12',
    name: 'GraphQL',
    qty: 1,
  },
  {
    _id: '1',
    name: 'Every answer to every question',
    qty: 42,
  },
];

export const resolvers = {
  Query: {
    allProducts() {
      return products;
    }
  }
}