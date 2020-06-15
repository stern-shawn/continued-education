import mongoose from 'mongoose';

import { app } from './app';
import { natsClient } from './nats-client';

const PORT = 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY not defined!');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI not defined!');
  }

  try {
    await natsClient.connect('ticketing', 'test', 'http://nats-srv:4222');
    natsClient.client.on('close', () => {
      console.log('NATS connection closed');
      process.exit();
    });
    process.on('SIGINT', () => natsClient.client.close());
    process.on('SIGTERM', () => natsClient.client.close());

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to mongodb');
  } catch (err) {
    console.error(err);
  }

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

start();
