import { currentUser, errorHandler, NotFoundError } from '@sstickets/common';
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes';
import { deleteOrderRouter } from './routes/delete';

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
app.use(currentUser);

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

// 404 handling
app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
