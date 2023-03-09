/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Request, Response, NextFunction } from 'express';
import config from '../../config';
const auth = (req: Request, res: Response, next: NextFunction): void => {
  const notDefined = req.body.pwd === undefined || req.body.pwd === null;
  const incorrect = !notDefined && req.body.pwd !== config.password;
  if (notDefined || incorrect) {
    res.status(403).send({ error: 'buka buka does not know the secret word' });
  } else {
    next();
  }
};
export default auth;
