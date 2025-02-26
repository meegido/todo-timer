import React from 'react';
import styles from './timer.module.css';
import TimerControls from '../../shared/timer-controls/timer-controls';

interface TimeLeft {
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

  return (
    <section className={styles.countdown__wrapper}>
      <div className={styles.timer__wrapper}>
        <div className={styles.time__wrapper}>
          <span aria-label={`Number of minutes left`}>
            {timeLeft.minutes.toString().length <= 1
              ? `${'0' + timeLeft.minutes}`
              : timeLeft.minutes.toString()}
          </span>
          <span>Minutes</span>
        </div>
        <span className={styles.divider}>:</span>
        <div className={styles.time__wrapper}>
          <span aria-label={`Number of seconds left`}>
            {timeLeft.seconds.toString().length <= 1
              ? `${'0' + timeLeft.seconds}`
              : timeLeft.seconds.toString()}
          </span>
          <span>Seconds</span>
        </div>
      </div>
      <TimerControls
        setIsCountdownActive={setIsCountdownActive}
        handleResetCountdown={handleResetCountdown}
      />
    </section>
  );
};

export default Timer;
