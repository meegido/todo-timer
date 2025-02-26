import styles from './timer.module.css';
import TimerControls from '../../shared/timer-controls/timer-controls';
import CountdownDisplay from './countdown-display/countdow-display';
import useTimer from '../../hooks/useTimer';

export interface TimeLeft {
  minutes: number;
  seconds: number;
}

const Timer = () => {
  const [
    timeLeft,
    handleResetCountdown,
    handlePlayCountdown,
    handlePauseCountdown,
  ] = useTimer();

  return (
    <section className={styles.countdown__wrapper}>
      <CountdownDisplay timeLeft={timeLeft} />
      <TimerControls
        onResetCountdown={handleResetCountdown}
        onPlayCountdown={handlePlayCountdown}
        onPauseCountdown={handlePauseCountdown}
      />
    </section>
  );
};

export default Timer;
