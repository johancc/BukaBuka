/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Router, Request, Response } from 'express';
import BukaBukaService from '../services/BukaBukaService';
import { postHappinessValidation } from '../middleware/validation/api-validator';
import validate from '../middleware/validation/validation';

class ApiRouter {
  private _router = Router();

  constructor() {
    this.configure();
  }

  get router() {
    return this._router;
  }

  private configure() {
    this.configureAdminRoutes();
    this.configurePublicRoutes();
  }

  private configureAdminRoutes() {
    this.router.post('/wakeup', (_, res) => {
      BukaBukaService.start()
      res.status(200).send({ msg: 'buka buka is awake.' });
    });

    this.router.post('/sleep', (_, res) => {
      BukaBukaService.stop();
      res.status(200).send({ msg: 'buka buka is sleeping.' });
    });

    this.router.post('/happiness', postHappinessValidation, validate, (req: Request, res: Response) => {
      const desiredHappiness = req.body.happiness;
      BukaBukaService.modifyHappiness(desiredHappiness);
      const happiness = BukaBukaService.getHappiness();
      if (desiredHappiness !== happiness) {
        res.status(500).send({ err: 'Failed to change happiness, somehow.' });
        return;
      }
      res.send({ happiness });
    });
  }

  private configurePublicRoutes() {
    this.router.get('/awake', (_, res) => {
      const awake = BukaBukaService.isAwake();
      res.json({ awake });
    });

    this.router.get('/happiness', (_, res) => {
      const happiness = BukaBukaService.getHappiness();
      res.status(200).json({ happiness });
    });

  }
}

export default new ApiRouter().router;
