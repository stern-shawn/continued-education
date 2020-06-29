import { OrderCancelledEvent } from '@sstickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

import { natsClient } from '../../../nats-client';
import { Ticket } from '../../../models/ticket';
import { OrderCancelledListener } from '../order-cancelled-listener';

const setup = async () => {
  const listener = new OrderCancelledListener(natsClient.client);

  const orderId = mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({ price: 10, title: 'concert', userId: 'asdf' });
  ticket.set({ orderId });
  await ticket.save();

  const data: OrderCancelledEvent['data'] = {
    version: 0,
    id: orderId,
    ticket: {
      id: ticket.id,
    },
  };
  // fake message event
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

describe('Order cancelled listener', () => {
  it('updates the ticket, publishes the event, and acks the message', async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket).toBeDefined();
    expect(updatedTicket!.orderId).toBeUndefined();
    expect(updatedTicket!.version).toEqual(data.version + 1);

    expect(natsClient.client.publish).toHaveBeenCalled();

    expect(msg.ack).toHaveBeenCalled();
  });
});
