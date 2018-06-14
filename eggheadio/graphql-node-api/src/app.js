import express from 'express';
import graphqlHttp from 'express-graphql';
import mongoose from 'mongoose';
import schema from './schema';

const app = express();
const port = 3000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gql_db');

app.use('/graphql', graphqlHttp({
  graphiql: true,
  schema,
  context: {
    userId: 1,
  },
}));

app.get('/', (req, res) => {
  return res.json({
    msg: 'hello graphql',
  });
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
