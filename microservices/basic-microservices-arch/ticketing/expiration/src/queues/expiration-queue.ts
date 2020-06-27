import Queue from 'bull';

interface ExpirationJobPayload {
  orderId: string;
}

const expirationQueue = new Queue<ExpirationJobPayload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  console.log(
    `TODO: publish an expiration:complete event for orderId: ${job.data.orderId}`
  );
});

export { expirationQueue };
