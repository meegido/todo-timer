import styles from './timer-controls.module.css';
import { Play } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
import { Pause } from 'lucide-react';

interface TimerControlsProps {
  setIsCountdownActive: React.Dispatch<React.SetStateAction<boolean>>;
  onResetCountdown: () => void;
}

const TimerControls = ({
  setIsCountdownActive,
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
      <button
        aria-label="Pause the countown"
        onClick={() => setIsCountdownActive(false)}
      >
        <Pause size={18} />
      </button>
      <button
        aria-label="Start the countown"
        onClick={() => setIsCountdownActive(true)}
      >
        <Play size={18} />
      </button>
    </section>
  );
};

export default TimerControls;
