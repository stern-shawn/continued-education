import { Listener, Subjects, ExpirationCompleteEvent, OrderStatus } from '@sstickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
  readonly queueGroupName = queueGroupName;

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const { orderId } = data;

    // Don't forget to populate the ticket!!!
    const order = await Order.findById(orderId).populate('ticket');

    if (!order) throw new Error('Order not found');
    // Don't cancel orders that have already been paid for! (user will likely pay within the 15 minute expiration window, so we don't want this event to clobber successful orders)
    if (order.status === OrderStatus.Complete) return msg.ack();

    // Note that we aren't wiping out the ticket record when cancelling (not part of the lookup logic,
    // also lets users view what ticket was part of the cancelled order)
    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    // Order is being modified... we need to let all the other services know about this change!
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}
