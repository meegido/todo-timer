import styles from './control-button.module.css';

interface ControlButtonProps {
  onHandleCountdown: () => void;
  icon: React.ComponentType<{ size: number }>;
  label: string;
  className?: string;
}
const ControlButton = ({
  onHandleCountdown,
  label,
  icon: Icon,
  className,
}: ControlButtonProps) => {
  return (
    <button
      className={`${styles.control__button} ${className || ''}`.trim()}
      aria-label={label}
      onClick={onHandleCountdown}
    >
      <Icon size={18} />
    </button>
  );
};

export default ControlButton;
