const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
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
  },
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
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
