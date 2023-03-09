import { emitHappinessLevel, emitAwakeEvent, emitSleepEvent } from '../../socket';
import { stopJobs } from './cron';
import Happiness from './happiness';
/**
 * Buka buka loves questions from weblab students. no questions make buka buka sad.
 *
 * The buka buka service is in charge of checking how happy buka buka is during class and
 * finding the questions & answers students are asking.
 */
class BukaBukaService {
  private happiness: Happiness;
  private awake = false;

  constructor() {
    this.happiness = new Happiness();
  }

  start() {
    this.awake = true;
    this.emitState()
    const msg = `buka buka has woken up at ${new Date().toTimeString()}`;
    // eslint-disable-next-line no-console
    console.log(`BukaBukaService::wakeUpBukaBuka(): ${msg}`);
  }

  isAwake() {
    return this.awake;
  }

  getHappiness() {
    return this.happiness.getHappiness();
  }

  modifyHappiness(desiredHappiness: number) {
    emitHappinessLevel(desiredHappiness);
    this.happiness.forceHappiness(desiredHappiness);
  }

  stop() {
    stopJobs();
    // eslint-disable-next-line no-console
    console.log(`BukaBukaService::stop(): buka buka has gone to sleep at ${new Date().toTimeString()}`);
    this.awake = false;
    this.happiness = new Happiness(); // Return to base happiness.
    emitSleepEvent();
  }


  private emitState() {
    emitHappinessLevel(this.happiness.getHappiness());
    emitAwakeEvent();
  }


}

export = new BukaBukaService();
