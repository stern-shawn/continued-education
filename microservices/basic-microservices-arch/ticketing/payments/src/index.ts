import mongoose from 'mongoose';

import { app } from './app';
import { natsClient } from './nats-client';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';

const PORT = 3000;

const start = async () => {
  const { JWT_KEY, STRIPE_KEY, MONGO_URI, NATS_URI, NATS_CLUSTER_ID, NATS_CLIENT_ID } = process.env;

  if (!JWT_KEY) throw new Error('JWT_KEY not defined!');
  if (!STRIPE_KEY) throw new Error('STRIPE_KEY not defined!');
  if (!MONGO_URI) throw new Error('MONGO_URI not defined!');
  if (!NATS_URI) throw new Error('NATS_URI not defined!');
  if (!NATS_CLUSTER_ID) throw new Error('NATS_CLUSTER_ID not defined!');
  if (!NATS_CLIENT_ID) throw new Error('NATS_CLIENT_ID not defined!');

  try {
    await natsClient.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URI);
    natsClient.client.on('close', () => {
      console.log('NATS connection closed');
      process.exit();
    });
    process.on('SIGINT', () => natsClient.client.close());
    process.on('SIGTERM', () => natsClient.client.close());

    // Attach listeners!
    new OrderCreatedListener(natsClient.client).listen();
    new OrderCancelledListener(natsClient.client).listen();

    await mongoose.connect(MONGO_URI, {
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
