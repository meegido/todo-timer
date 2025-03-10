import React, { ReactNode } from 'react';
import useTimer from '../hooks/use-timer';
import TimerContext from '../context/timer-context';

export interface TimeLeft {
  minutes: number;
  seconds: number;
}

interface TimerProviderProps {
  children: ReactNode;
}

const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const {
    timeLeft,
    setTimeLeft,
    isCountdownActive,
    setIsCountdownActive,
    isCountdownPaused,
    handlePlayCountdown,
    handlePauseCountdown,
    handleResetCountdown,
  } = useTimer();

  return (
    <TimerContext.Provider
      value={{
        timeLeft,
        setTimeLeft,
        isCountdownActive,
        setIsCountdownActive,
        isCountdownPaused,
        handlePlayCountdown,
        handlePauseCountdown,
        handleResetCountdown,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
