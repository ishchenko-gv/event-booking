import express from 'express';

import * as userService from '../user/service';
import { InvalidUserOrPasswordError } from '../user/exceptions';
import { authRequired } from '.';

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
  try {
    await userService.signup(req.body.email, req.body.password);

    res.status(201).send();
  } catch (err) {
    res.status(500).send();
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const jwt = await userService.login(req.body.email, req.body.password);

    res.cookie('token', jwt, { httpOnly: true });
    res.send();
  } catch (err) {
    if (err instanceof InvalidUserOrPasswordError) {
      return res.status(400).send(err);
    }

    res.status(500).send();
  }
});

authRouter.get('/me', authRequired, async (req, res) => {
  res.send(req.user);
});

export { authRouter };
