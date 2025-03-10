import { TimeLeft } from '../timer';
import styles from './countdown-display.module.css';

interface CountdownDisplayProps {
  timeLeft: TimeLeft;
}

const CountdownDisplay = ({ timeLeft }: CountdownDisplayProps) => {
  // console.log(timeLeft, timeLeft);
  return (
    <section className={styles.timer__wrapper}>
      <div className={styles.time__wrapper}>
        <span aria-label={`Number of minutes left`}>
          {timeLeft.minutes.toString().length <= 1
            ? `${'0' + timeLeft.minutes}`
            : timeLeft.minutes.toString()}
        </span>
        <span>Minutes</span>
      </div>
      <span className={styles.divider}>:</span>
      <div className={styles.time__wrapper}>
        <span aria-label={`Number of seconds left`}>
          {timeLeft.seconds.toString().length <= 1
            ? `${'0' + timeLeft.seconds}`
            : timeLeft.seconds.toString()}
        </span>
        <span>Seconds</span>
      </div>
    </section>
  );
};

export default CountdownDisplay;
