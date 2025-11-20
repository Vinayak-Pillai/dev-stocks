import { TAuthData } from './auth';

declare global {
  namespace Express {
    interface Request {
      user?: TAuthData;
    }
  }
}
