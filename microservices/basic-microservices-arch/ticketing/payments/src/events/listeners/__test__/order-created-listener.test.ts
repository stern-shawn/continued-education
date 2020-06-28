import { OrderCreatedEvent, OrderStatus } from '@sstickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

import { OrderCreatedListener } from '../order-created-listener';
import { natsClient } from '../../../nats-client';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  // Create listener instance
  const listener = new OrderCreatedListener(natsClient.client);
  // Create and save a ticket
  const ticket = Ticket.build({ price: 10, title: 'concert', userId: 'asdf' });
  await ticket.save();
  // fake data object
  const data: OrderCreatedEvent['data'] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: 'asdf',
    status: OrderStatus.Created,
    expiresAt: 'timmay',
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };
  // fake message event
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

describe('Order created listener', () => {
  it('updates the ticket with order userId', async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket).toBeDefined();
    expect(updatedTicket!.userId).toEqual(data.userId);
    expect(updatedTicket!.version).toEqual(data.version + 1);
  });

  it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });

  it('publishes a ticket update event with the updated ticket/order id', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const ticketUpdatedData = JSON.parse((natsClient.client.publish as jest.Mock).mock.calls[0][1]);

    expect(data.id).toEqual(ticketUpdatedData.orderId);
  });
});
