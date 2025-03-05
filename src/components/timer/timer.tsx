import React from 'react';
import styles from './timer.module.css';
import { RotateCcw } from 'lucide-react';
import { Pause } from 'lucide-react';
import CountdownDisplay from './countdown-display/countdow-display';
import PlayButton from '../../shared/play-button/play-button';
import TimerContext from '../../context/timer-context';
import PauseButton from '../../shared/pause-button/pause-button';

export interface TimeLeft {
  minutes: number;
  seconds: number;
}

const Timer = () => {
  const timerContext = React.useContext(TimerContext);

  if (!timerContext) {
    throw new Error('Timer must be used within a TimerProvider');
  }

  const {
    timeLeft,
    handlePlayCountdown,
    handlePauseCountdown,
    handleResetCountdown,
  } = timerContext;

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
        <PauseButton onPauseCountdown={handlePauseCountdown} />
        <PlayButton onPlayCountdown={handlePlayCountdown} />
      </section>
    </section>
  );
};

export default Timer;
