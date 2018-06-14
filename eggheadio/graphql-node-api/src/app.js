import express from 'express';
import graphqlHttp from 'express-graphql';

const app = express();
const port = 3000;

// Empty object, build later
const schema = {};

app.use('/graphql', graphqlHttp({
    graphiql: true,
    schema,
}));

app.get('/', (req, res) => {
    return res.json({
        msg: 'hello graphql',
    });
});

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});
