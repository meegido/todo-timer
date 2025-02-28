import React from 'react';

interface TimerControls {
  isCountdownActive: boolean;
  setIsCountdownActive: React.Dispatch<React.SetStateAction<boolean>>;
  handlePlayCountdown: () => void;
  handlePauseCountdown: () => void;
}

const useTimerControls = (): TimerControls => {
  const [isCountdownActive, setIsCountdownActive] =
    React.useState<boolean>(false);

  const handlePlayCountdown = () => {
    setIsCountdownActive(true);
  };

  const handlePauseCountdown = () => {
    setIsCountdownActive(!isCountdownActive);
  };

  return {
    isCountdownActive,
    setIsCountdownActive,
    handlePlayCountdown,
    handlePauseCountdown,
  };
};

export default useTimerControls;
