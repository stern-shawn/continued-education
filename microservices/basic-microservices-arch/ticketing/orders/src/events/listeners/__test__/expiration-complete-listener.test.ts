import { OrderStatus, ExpirationCompleteEvent } from '@sstickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

import { natsClient } from '../../../nats-client';
import { Ticket } from '../../../models/ticket';
import { ExpirationCompleteListener } from '../expiration-complete-listener';
import { Order } from '../../../models/order';

const setup = async () => {
  // Create listener instance
  const listener = new ExpirationCompleteListener(natsClient.client);
  // Create and save a ticket to modify
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    price: 10,
    title: 'concert',
  });
  await ticket.save();

  const order = Order.build({
    userId: 'test',
    expiresAt: new Date(),
    status: OrderStatus.Created,
    ticket,
  });
  await order.save();

  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id,
  };
  // fake message event
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, data, msg };
};

describe('Expiration complete listener', () => {
  it('updates the order status to cancelled', async () => {
    const { listener, order, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder).toBeDefined();
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
  });

  it('emits an order cancelled event', async () => {
    const { listener, order, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(natsClient.client.publish).toHaveBeenCalled();

    const orderExpiredData = JSON.parse((natsClient.client.publish as jest.Mock).mock.calls[0][1]);
    expect(orderExpiredData.id).toEqual(order.id);
  });

  it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });

  it('does not cancel orders that have already completed and does not publish the cancelled event', async () => {
    const { listener, order, data, msg } = await setup();

    order.set({ status: OrderStatus.Complete });
    await order.save();

    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder).toBeDefined();
    expect(updatedOrder!.status).toEqual(OrderStatus.Complete);

    expect(natsClient.client.publish).not.toHaveBeenCalled();
  });
});
