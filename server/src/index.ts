import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { connectDatabase } from './db';

import { jwtStrategy } from './auth';
import { authRouter } from './auth/handlers';

connectDatabase();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

passport.use('jwt', jwtStrategy);

app.use('/auth', authRouter);

app.listen(8000, () =>
  console.info('Server is running on http://localhost:8000')
);
