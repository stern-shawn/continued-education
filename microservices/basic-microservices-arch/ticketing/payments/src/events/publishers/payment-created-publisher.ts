import { Publisher, Subjects, PaymentCreatedEvent } from '@sstickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
