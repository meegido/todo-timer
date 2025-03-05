import styles from './pause-button.module.css';
import { Pause } from 'lucide-react';

interface PauseButtonProps {
  onPauseCountdown: () => void;
  label?: string;
  className?: string;
  isTodoHover?: boolean;
}

const PauseButton = ({
  onPauseCountdown,
  label = 'Pause the countown',
  isTodoHover = true,
}: PauseButtonProps) => {
  return (
    <button
      className={`${isTodoHover ? styles.pause__button : styles.hidden}`}
      aria-label={label}
      onClick={onPauseCountdown}
    >
      <Pause size={18} />
    </button>
  );
};

export default PauseButton;
