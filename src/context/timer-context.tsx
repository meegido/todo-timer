import React from 'react';
import { TimeLeft } from '../hooks/use-timer';

interface TimerContextProps {
  timeLeft: TimeLeft;
  setTimeLeft: React.Dispatch<React.SetStateAction<TimeLeft>>;
  isCountdownActive: boolean;
  isCountdownPaused: boolean;
  setIsCountdownActive: React.Dispatch<React.SetStateAction<boolean>>;
  handlePlayCountdown: () => void;
  handlePauseCountdown: () => void;
  handleResetCountdown: () => void;
}

const TimerContext = React.createContext<TimerContextProps | undefined>(
  undefined
);

export default TimerContext;
