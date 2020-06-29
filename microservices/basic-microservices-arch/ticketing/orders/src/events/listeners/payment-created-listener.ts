import { Listener, Subjects, PaymentCreatedEvent, OrderStatus } from '@sstickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';

import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  readonly queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const { orderId } = data;

    const order = await Order.findById(orderId);

    if (!order) throw new Error(`Order not found: ${orderId}`);

    order.set({ status: OrderStatus.Complete });
    await order.save();

    msg.ack();
  }
}
