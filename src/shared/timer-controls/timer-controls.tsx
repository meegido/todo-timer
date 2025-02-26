import styles from './timer-controls.module.css';
import { Play } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
import { Pause } from 'lucide-react';

interface TimerControlsProps {
  onResetCountdown: () => void;
  onPlayCountdown: () => void;
  onPauseCountdown: () => void;
}

const TimerControls = ({
  onPlayCountdown,
  onPauseCountdown,
  onResetCountdown,
}: TimerControlsProps) => {
  return (
    <section className={styles.controls__wrapper}>
      <button
        aria-label="Reset the countown"
        onClick={() => onResetCountdown()}
      >
        <RotateCcw size={18} />
      </button>
      <button aria-label="Pause the countown" onClick={onPauseCountdown}>
        <Pause size={18} />
      </button>
      <button aria-label="Start the countown" onClick={onPlayCountdown}>
        <Play size={18} />
      </button>
    </section>
  );
};

export default TimerControls;
