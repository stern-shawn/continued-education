import { Listener, Subjects, TicketCreatedEvent } from '@sstickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  readonly queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Ticket created event received by orders service', data);
    const { title, price } = data;

    const ticket = Ticket.build({ title, price });
    await ticket.save();

    msg.ack();
  }
}
