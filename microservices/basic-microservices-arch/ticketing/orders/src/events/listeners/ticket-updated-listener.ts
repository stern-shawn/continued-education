import { Listener, Subjects, TicketUpdatedEvent } from '@sstickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  readonly queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    console.log('Ticket Updated event received by orders service', data);
    const { id, title, price, version } = data;
    // We only want to process incremental updates to avoid concurrency issues, verify using version
    const ticket = await Ticket.findOne({ _id: id, version: version - 1 });

    // TODO: Proper error handling in events
    if (!ticket) throw new Error('Ticket not found');

    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
