import { Publisher, Subjects, TicketCreatedEvent } from '@sstickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
