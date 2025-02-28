import { RotateCcw } from 'lucide-react';
import { Pause } from 'lucide-react';

import styles from './timer.module.css';
import CountdownDisplay from './countdown-display/countdow-display';
import PlayButton from '../../shared/timer-controls/play-button';
import useTimer from '../../hooks/useTimer';

export interface TimeLeft {
  minutes: number;
  seconds: number;
}

const Timer = () => {
  const {
    timeLeft,
    handlePlayCountdown,
    handlePauseCountdown,
    handleResetCountdown,
  } = useTimer();

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
