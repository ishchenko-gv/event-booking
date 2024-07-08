import express from 'express';

import * as userService from './service';
import { InvalidUserOrPasswordError } from './exceptions';
import { authRequired } from '../auth';

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  try {
    await userService.signup(req.body.email, req.body.password);

    res.status(201).send();
  } catch (err) {
    res.status(500).send();
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const jwt = await userService.login(req.body.email, req.body.password);

    res.cookie('token', jwt, { httpOnly: true });
    res.send({ token: jwt });
  } catch (err) {
    if (err instanceof InvalidUserOrPasswordError) {
      return res.status(400).send(err);
    }

    res.status(500).send();
  }
});

userRouter.get('/me', authRequired, async (req, res) => {
  res.send(req.user);
});

export { userRouter };
