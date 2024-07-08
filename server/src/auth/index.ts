import { Request } from 'express';
import passport from 'passport';
import {
  Strategy as JwtStrategy,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';

import { getUser } from '../user/queries';

function extractToken(req: Request) {
  return req.cookies['token'];
}

export const opts: StrategyOptionsWithoutRequest = {
  jwtFromRequest: extractToken,
  secretOrKey: process.env.SECRET!,
};

export const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await getUser(jwt_payload.id);

    if (!user) return done(null, false);

    const userData = {
      id: user.id,
      email: user.email,
    };

    return done(null, userData);
  } catch (err) {
    return done(err, false);
  }
});

export const authRequired = passport.authenticate('jwt', { session: false });
