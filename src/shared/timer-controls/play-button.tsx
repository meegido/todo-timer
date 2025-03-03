import styles from './play-button.module.css';
import { Play } from 'lucide-react';

interface PlayButtonProps {
  onPlayCountdown: () => void;
  label?: string;
  className?: string;
  isTodoHover?: boolean;
}

const PlayButton = ({
  onPlayCountdown,
  label = 'Start the countown',

  isTodoHover = true,
}: PlayButtonProps) => {
  return (
    <button
      className={`${isTodoHover ? styles.play__button : styles.hidden}`}
      aria-label={label}
      onClick={onPlayCountdown}
    >
      <Play size={18} />
    </button>
  );
};

export default PlayButton;
