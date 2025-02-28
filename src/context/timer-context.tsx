import React from 'react';
import { TimeLeft } from '../hooks/useTimer';

interface TimerContextProps {
  timeLeft: TimeLeft;
  setTimeLeft: React.Dispatch<React.SetStateAction<TimeLeft>>;
  isCountdownActive: boolean;
  setIsCountdownActive: React.Dispatch<React.SetStateAction<boolean>>;
  handlePlayCountdown: () => void;
  handlePauseCountdown: () => void;
  handleResetCountdown: () => void;
}

const TimerContext = React.createContext<TimerContextProps | undefined>(
  undefined
);

export default TimerContext;
