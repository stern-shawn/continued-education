const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(res => res.data);
      },
    }
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        // ParentValue will be the selected user, ie { id: '47', firstName: 'Sam', age: 40, companyId: '2' }
        // so we can access its companyId value to search for their company
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(res => res.data);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        // Axios by default returns data nested in a data key { data: { id:..., name:... }}
        // so we need to pare it down first to just the result
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then(res => res.data);
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        // Axios by default returns data nested in a data key { data: { id:..., name:... }}
        // so we need to pare it down first to just the result
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then(res => res.data);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        // Enforce that firstName and age must be provided to addUser operation. Low-level validation, not the best yet...
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve(parentValue, { firstName, age, companyId }) { // destructure args.firstName, args.age
        return axios
          .post('http://localhost:3000/users', { firstName, age, companyId })
          .then(res => res.data);
      },
      // Note: using this, we would provide something like this to GraphQL:
      // mutation {
      //   addUser(firstName: "Shawn", age: 26) {
      //     id
      //     firstName
      //     age
      //   }
      // }
      // notice how after the mutation we also need to query for results

    },
    deleteUser: {
      type: UserType,
      args: {
        // We should only need a user's id for deletion, nothing else
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { id }) {
        return axios
          .delete(`http://localhost:3000/users/${id}`)
          .then(res => res.data);
          // This should return a value of null on success since JSON server doesn't return anything on DELETE
      },
      // Usage to remove user Shawn with id rJbIf8CUf
      // mutation {
      //   deleteUser(id: "rJbIf8CUf") {
      //     id
      //   }
      // }
    },
    editUser: {
      type: UserType,
      args: {
        // Require ID, but all other args are optional
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
      },
      resolve(parentValue, { id, ...args}) { // pluck out id and store the rest of the input in `args`
        return axios
          .patch(`http://localhost:3000/users/${id}`, { ...args }) // send PATCH using user id and spread `args`
          .then(res => res.data);
      },
      // Note on verbs!
      // - PUT will complete replace an object, and if some values are omitted, they'll be null'd on the overwritten field
      // - PATCH will only update the provided fields and ignore those that aren't specified
      // Mutation to convert user id 31 name from Alex to Timmay
      // mutation {
      //   editUser(id: "31", firstName: "Timmay") {
      //     id
      //     firstName
      //     age
      //   }
      // }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation, // provided mutation: mutation property
});
