import { errorHandler, NotFoundError } from '@sstickets/common';
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';

const app = express();

// Trust the ngnix proxy
app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    // Supertest makes plain http requests; disable https requirement in test env
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// 404 handling
app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
