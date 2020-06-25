import { Publisher, Subjects, OrderCancelledEvent } from '@sstickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
