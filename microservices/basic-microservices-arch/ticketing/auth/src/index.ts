import express from 'express';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';

const PORT = 3000;
const app = express();

app.use(json());
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
