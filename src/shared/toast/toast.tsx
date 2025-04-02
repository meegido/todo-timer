import { Info, X } from 'lucide-react';
import styles from './toast.module.css';

interface ToastProps {
  onDismiss: () => void;
  onPressEscape: () => void;
}

const Toast = ({ onDismiss, onPressEscape }: ToastProps) => {
  return (
    <section
      role="status"
      aria-live="polite"
      className={`${styles.toast} ${styles.success}`}
    >
      <div className={styles.icon__container}>
        <Info size={24} />
      </div>
      <p className={styles.content}>Todo successfully deleted</p>
      <button
        className={styles.close_button}
        onClick={onDismiss}
        onKeyDown={onPressEscape}
      >
        <X />
        <p className={styles.visually__hidden}>Dismiss message</p>
      </button>
    </section>
  );
};

export default Toast;
