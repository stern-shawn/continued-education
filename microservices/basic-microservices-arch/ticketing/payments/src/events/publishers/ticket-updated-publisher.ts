import { Publisher, Subjects, TicketUpdatedEvent } from '@sstickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
