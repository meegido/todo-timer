import styles from './play-button.module.css';
import { Play } from 'lucide-react';

interface PlayButtonProps {
  onPlayCountdown: () => void;
  label?: string;
}

const PlayButton = ({
  onPlayCountdown,
  label = 'Start the countown',
}: PlayButtonProps) => {
  return (
    <button
      className={styles.play__button}
      aria-label={label}
      onClick={onPlayCountdown}
    >
      <Play size={18} />
    </button>
  );
};

export default PlayButton;
