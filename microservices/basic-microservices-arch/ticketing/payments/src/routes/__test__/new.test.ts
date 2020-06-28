import { OrderStatus } from '@sstickets/common';
import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '../../app';
import { Order } from '../../models/order';
import { stripe } from '../../stripe';
import { Payment } from '../../models/payment';

jest.mock('../../stripe');

const newPaymentsRoute = '/api/payments';

it('has a route handler listening to /api/payments for post requests', async () => {
  const response = await request(app).post(newPaymentsRoute).send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  await request(app).post(newPaymentsRoute).send({}).expect(401);
});

it('returns a 404 when purchasing an order that does not exist', async () => {
  const response = await request(app).post(newPaymentsRoute).set('Cookie', global.signin()).send({
    token: 'test',
    orderId: mongoose.Types.ObjectId().toHexString(),
  });

  expect(response.status).toEqual(404);
});

it('returns a 401 when purchasing an order that does not belong to the user', async () => {
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post(newPaymentsRoute)
    .set('Cookie', global.signin())
    .send({
      orderId: order.id,
      token: 'test',
    })
    .expect(401);
});

it('returns a 400 when purchasing a cancelled order', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled,
  });
  await order.save();

  await request(app)
    .post(newPaymentsRoute)
    .set('Cookie', global.signin(userId))
    .send({
      orderId: order.id,
      token: 'test',
    })
    .expect(400);
});

it('returns a 201 for valid inputs and creates a payment', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post(newPaymentsRoute)
    .set('Cookie', global.signin(userId))
    .send({
      orderId: order.id,
      token: 'tok_visa',
    })
    .expect(201);

  expect(stripe.charges.create).toHaveBeenCalled();
  expect(stripe.charges.create).toHaveBeenCalledWith({
    amount: order.price * 100,
    currency: 'usd',
    source: 'tok_visa',
  });

  const payment = await Payment.findOne({ orderId: order.id });

  expect(payment).not.toBeNull();
});
