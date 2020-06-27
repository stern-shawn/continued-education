import { natsClient } from './nats-client';

const PORT = 3000;

const start = async () => {
  const { NATS_URI, NATS_CLUSTER_ID, NATS_CLIENT_ID } = process.env;

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

    // Attach our listeners!
  } catch (err) {
    console.error(err);
  }
};

start();
