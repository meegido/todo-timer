import styles from './timer.module.css';
import CountdownDisplay from './countdown-display/countdow-display';
import { Play, Pause, RotateCcw } from 'lucide-react';
import ControlButton from '../../shared/control-button/control-button';

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
        <ControlButton
          label="Reset the countown"
          onHandleCountdown={onHandleReset}
          icon={RotateCcw}
        />
        <ControlButton
          label="Pause the countown"
          onHandleCountdown={onHandlePause}
          icon={Pause}
        />
        <ControlButton
          label="Play the countown"
          onHandleCountdown={onHandlePlay}
          icon={Play}
        />
      </section>
    </section>
  );
};

export default Timer;
