import express from 'express';

import * as userService from '../user/service';
import { authRequired } from '.';
import { userCredentialsSchema } from './schema';

const authRouter = express.Router();

authRouter.post('/signup', async (req, res, next) => {
  try {
    const userData = userCredentialsSchema.parse(req.body);
    await userService.signup(userData.email, userData.password);

    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const userData = userCredentialsSchema.parse(req.body);
    const jwt = await userService.login(userData.email, userData.password);

    res.cookie('token', jwt, { httpOnly: true });
    res.send();
  } catch (err) {
    next(err);
  }
});

authRouter.get('/me', authRequired, (req, res) => {
  res.send(req.user);
});

export { authRouter };
