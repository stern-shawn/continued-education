import { TicketUpdatedEvent } from '@sstickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

import { natsClient } from '../../../nats-client';
import { Ticket } from '../../../models/ticket';
import { TicketUpdatedListener } from '../ticket-updated-listener';

const setup = async () => {
  // Create listener instance
  const listener = new TicketUpdatedListener(natsClient.client);
  // Create and save a ticket to modify
  const ticket = Ticket.build({ id: mongoose.Types.ObjectId().toHexString(), price: 10, title: 'concert' });
  await ticket.save();
  // fake data object
  const data: TicketUpdatedEvent['data'] = {
    version: ticket.version + 1,
    id: ticket.id,
    title: 'updated concert',
    price: 444,
    userId: 'irrelevant',
  };
  // fake message event
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, ticket };
};

describe('Ticket updated listener', () => {
  it('finds, updates, and saves a given ticket', async () => {
    const { listener, data, msg, ticket } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket).toBeDefined();
    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);
  });

  it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });

  it('handles out of order events by not calling ack for wrong versions', async () => {
    const { listener, data, msg } = await setup();

    data.version = 4;

    try {
      await listener.onMessage(data, msg);
    } catch (e) {}

    expect(msg.ack).not.toHaveBeenCalled();
  });
});
