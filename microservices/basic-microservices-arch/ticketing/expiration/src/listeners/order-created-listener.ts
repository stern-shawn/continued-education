import { Listener, OrderCreatedEvent, Subjects } from '@sstickets/common';
import { Message } from 'node-nats-streaming';

import { queueGroupName } from './queue-group-name';
import { expirationQueue } from '../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  // On new orders, create an expiration job and add it to the queue
  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    await expirationQueue.add({ orderId: data.id });

    msg.ack();
  }
}
