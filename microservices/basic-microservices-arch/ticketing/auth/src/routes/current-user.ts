import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', async (req, res) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const currentUser = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser });
  } catch (err) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
