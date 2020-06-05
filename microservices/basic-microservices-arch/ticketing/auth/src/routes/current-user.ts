import { currentUser } from '@sstickets/common';
import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, async (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
