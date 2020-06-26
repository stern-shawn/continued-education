import { validateRequest, NotFoundError, requireAuth, NotAuthorizedError, BadRequestError } from '@sstickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { Ticket } from '../models/ticket';
import { natsClient } from '../nats-client';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be provided and must be greater than 0'),
  ],
  validateRequest,
  async (req: Request<{ id: string }, {}, { title: string; price: string }>, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    const { title, price } = req.body;

    if (!ticket) throw new NotFoundError();

    if (ticket.userId !== req.currentUser?.id) throw new NotAuthorizedError();

    if (ticket.orderId) throw new BadRequestError('Cannot edit a reserved ticket');

    ticket.set({ title, price });

    await ticket.save();

    new TicketUpdatedPublisher(natsClient.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    });

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
