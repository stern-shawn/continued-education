import { OrderCancelledEvent, OrderStatus } from '@sstickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

import { natsClient } from '../../../nats-client';
import { Order } from '../../../models/order';
import { OrderCancelledListener } from '../order-cancelled-listener';

const setup = async () => {
  const listener = new OrderCancelledListener(natsClient.client);

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    price: 10,
    userId: 'test',
    status: OrderStatus.Created,
    version: 0,
  });
  await order.save();

  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: order.version + 1,
    ticket: {
      id: 'test',
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, data, msg };
};

describe('Order cancelled listener', () => {
  it('updates the order, publishes the event, and acks the message', async () => {
    const { listener, order, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toBe(OrderStatus.Cancelled);

    expect(msg.ack).toHaveBeenCalled();
  });
});
