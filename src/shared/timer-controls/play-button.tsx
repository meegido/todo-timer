import styles from './play-button.module.css';
import { Play } from 'lucide-react';

interface PlayButtonProps {
  onPlayCountdown: () => void;
}

const PlayButton = ({ onPlayCountdown }: PlayButtonProps) => {
  return (
    <button
      className={styles.play__button}
      aria-label="Start the countown"
      onClick={onPlayCountdown}
    >
      <Play size={18} />
    </button>
  );
};

export default PlayButton;
