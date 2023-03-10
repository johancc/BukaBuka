/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import socket from './client-socket';

import buka_0 from './images/buka_0.png';
import buka_1 from './images/buka_1.png';
import buka_2 from './images/buka_2.png';
import buka_3 from './images/buka_3.png';
import buka_4 from './images/buka_4.png';
import sleepingBuka from './images/buka_sleep.png';

import './main.scss';

const images = {
  0: buka_0,
  1: buka_1,
  2: buka_2,
  3: buka_3,
  4: buka_4,
  5: sleepingBuka,
};

interface HappinessResponse {
  happiness: number;
}

interface AwakeResponse {
  awake: boolean;
}

export const Main: React.FunctionComponent = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [happiness, setHappiness] = useState<number>(0.5);
  const [count, setCount] = useState<number>(0);
  const [question] = useState<string>('can i use --force in my git commands for good luck?');
  const [active, setActive] = useState<boolean>(false);

  const getHappiness = async () => {
    const happinessValue = await axios
      .get<HappinessResponse>('/api/happiness')
      .then((res) => res.data)
      .then((happinessResp) => happinessResp.happiness);
    setHappiness(happinessValue);
  };

  const checkIfClassActive = async () => {
    const awake = await axios
      .get<AwakeResponse>('/api/awake')
      .then((res) => res.data)
      .then((awakeResp) => awakeResp.awake);
    setActive(awake);
  };

  useEffect(() => {
    socket.on('happiness', (happiness: number) => {
      setHappiness(happiness);
      setCount(count + 1);
    });
    socket.on('awake', () => {
      setActive(true);
      setCount(count + 1);
    });
    socket.on('sleep', () => {
      setActive(false);
      setCount(count + 1);
    });
  }, []);

  useEffect(() => {
    checkIfClassActive().catch((err: AxiosError) => {
      throw new Error(`Buka buka is not in class: ${err}`);
    });
  }, []);

  useEffect(() => {
    Promise.all([getHappiness()])
      .then(() => {
        setLoaded(true);
      })
      .catch((err) => {
        throw new Error(`Failed to contact the buka buka service: ${err}`);
      });
  }, []);

  const buka_number = Math.min(Math.trunc(happiness / 0.2), 4);
  const buka_size = Math.trunc(happiness * 10) + 1;

  const text = loaded
    ? question
      ? question
      : "this is buka buka the turtle. buka buka loves GET and POST requests from codenext. no requests make buka buka sad. you don't want to make buka buka sad."
    : 'buka buka cannot be reached. the codenext staff is saddened.';

  const textWhenNotInClass = 'buka buka is resting';
  return (
    <div className="dark-blue-bg">
      <div className="container">
        <div className="title white-text">{active ? text : textWhenNotInClass} </div>
        <div className="white-text"> Number of new POST requests: {count}</div>
        {active ? (
          <img className={`buka-image-${buka_size}`} src={images[buka_number] || buka_2} alt="buka buka" />
        ) : (
          <img className={`buka-image-5`} src={sleepingBuka} alt="sleeping buka buka" />
        )}
      </div>
    </div>
  );
};
