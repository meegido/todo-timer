import styles from './timer.module.css';
import { RotateCcw } from 'lucide-react';
import CountdownDisplay from './countdown-display/countdow-display';
import PlayButton from '../../shared/play-button/play-button';
import PauseButton from '../../shared/pause-button/pause-button';

export interface TimeLeft {
  minutes: number;
  seconds: number;
}

interface TimerProps {
  timeLeft: TimeLeft;
  onHandlePlay: () => void;
  onHandlePause: () => void;
  onHandleReset: () => void;
}

const Timer = ({
  timeLeft,
  onHandlePlay,
  onHandlePause,
  onHandleReset,
}: TimerProps) => {
  return (
    <section className={styles.countdown__wrapper}>
      <CountdownDisplay timeLeft={timeLeft} />
      <section className={styles.controls__wrapper}>
        <button aria-label="Reset the countown" onClick={onHandleReset}>
          <RotateCcw size={18} />
        </button>
        <PauseButton onPauseCountdown={onHandlePause} />
        <PlayButton onPlayCountdown={onHandlePlay} />
      </section>
    </section>
  );
};

export default Timer;
