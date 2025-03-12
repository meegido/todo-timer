import styles from './control-button.module.css';

interface ControlButtonProps {
  onHandleCountdown: () => void;
  icon: React.ComponentType<{ size: number }>;
  label: string;
  className?: string;
  isTodoHover?: boolean;
}
const ControlButton = ({
  onHandleCountdown,
  label,
  isTodoHover = true,
  icon: Icon,
}: ControlButtonProps) => {
  return (
    <button
      className={`${isTodoHover ? styles.control__button : styles.hidden}`}
      aria-label={label}
      onClick={onHandleCountdown}
    >
      <Icon size={18} />
    </button>
  );
};

export default ControlButton;
