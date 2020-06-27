import { Listener, Subjects, TicketCreatedEvent } from '@sstickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  readonly queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;

    // Provide id so we have a stable id between services, gets aliased to mongo _id in build
    const ticket = Ticket.build({ id, title, price });
    await ticket.save();

    msg.ack();
  }
}
