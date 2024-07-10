import { Request } from 'express';
import { RequestUser } from '../src/user/types';

declare module 'express-serve-static-core' {
  interface Request {
    user?: RequestUser;
  }
}
