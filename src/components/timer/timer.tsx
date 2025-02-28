import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Pause } from 'lucide-react';

import styles from './timer.module.css';
import CountdownDisplay from './countdown-display/countdow-display';
import PlayButton from '../../shared/timer-controls/play-button';

export interface TimeLeft {
  minutes: number;
  seconds: number;
}

const Timer = () => {
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({
    minutes: 25,
    seconds: 0,
  });

  const [isCountdownActive, setIsCountdownActive] =
    React.useState<boolean>(false);
  const intervalRef = React.useRef<number | null>(0);

  const duration = timeLeft.minutes * 60 * 1000 + timeLeft.seconds * 1000; // Convert to milliseconds
  const durationTimestamp = new Date().getTime() + duration; // Calculate the target timestamp - future

  React.useEffect(() => {
    const currentTimeStamp = new Date().getTime();
    const remaining = durationTimestamp - currentTimeStamp;

    const updateCountdown = () => {
      const newTimeLeft = remaining;
      setTimeLeft(() => {
        return {
          minutes: Math.floor((newTimeLeft / 1000 / 60) % 60),
          seconds: Math.floor((newTimeLeft / 1000) % 60),
        };
      });
    };

    if (isCountdownActive) {
      intervalRef.current = window.setInterval(updateCountdown, 1000);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [durationTimestamp, isCountdownActive]);

  const handleResetCountdown = () => {
    setIsCountdownActive(false);
    setTimeLeft(() => {
      return {
        minutes: 25,
        seconds: 0,
      };
    });
  };

  const handlePlayCountdown = () => {
    setIsCountdownActive(true);
  };

  const handlePauseCountdown = () => {
    setIsCountdownActive(false);
  };

  return (
    <section className={styles.countdown__wrapper}>
      <CountdownDisplay timeLeft={timeLeft} />
      <section className={styles.controls__wrapper}>
        <button
          aria-label="Reset the countown"
          onClick={() => handleResetCountdown()}
        >
          <RotateCcw size={18} />
        </button>
        <button aria-label="Pause the countown" onClick={handlePauseCountdown}>
          <Pause size={18} />
        </button>
        <PlayButton onPlayCountdown={handlePlayCountdown} />
      </section>
    </section>
  );
};

export default Timer;
