import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from '@sstickets/common';
import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { Order } from '../models/order';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    // Find the ticket the user is trying to order
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }
    // Make sure it isn't already reserved
    const existingOrder = await Order.findOne({
      ticket,
      status: {
        $in: [OrderStatus.Created, OrderStatus.AwaitingPayment, OrderStatus.Complete],
      },
    });
    if (existingOrder) {
      throw new BadRequestError('Ticket is already reserved');
    }
    // Calculate an exp date so the ticket can free up for other users

    // Build the order and save it

    // Publish an order created event

    res.send({});
  }
);

export { router as newOrderRouter };
