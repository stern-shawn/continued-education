import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { UserPayload } from './middlewares/current-user';

const app = express();

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

// Trust the ngnix proxy
app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
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
