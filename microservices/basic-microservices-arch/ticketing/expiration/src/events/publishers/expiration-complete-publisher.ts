import { Publisher, ExpirationCompleteEvent, Subjects } from '@sstickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
