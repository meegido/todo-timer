import React from 'react';

export interface TimeLeft {
  minutes: number;
  seconds: number;
}

interface Timer {
  timeLeft: TimeLeft;
  setTimeLeft: React.Dispatch<React.SetStateAction<TimeLeft>>;
  isCountdownActive: boolean;
  setIsCountdownActive: React.Dispatch<React.SetStateAction<boolean>>;
  handlePlayCountdown: () => void;
  handlePauseCountdown: () => void;
  handleResetCountdown: () => void;
}

const useTimer = (): Timer => {
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({
    minutes: 25,
    seconds: 0,
  });
  const [isCountdownActive, setIsCountdownActive] =
    React.useState<boolean>(false);

  const intervalRef = React.useRef<number | null>(0);

  const duration = timeLeft.minutes * 60 * 1000 + timeLeft.seconds * 1000; // Convert to milliseconds
  const durationTimestamp = new Date().getTime() + duration; // Calculate the target timestamp - future

  React.useEffect(() => {
    const updateCountdown = () => {
      const remaining = durationTimestamp - new Date().getTime();
      setTimeLeft({
        minutes: Math.floor((remaining / 1000 / 60) % 60),
        seconds: Math.floor((remaining / 1000) % 60),
      });
    };

    if (isCountdownActive) {
      intervalRef.current = window.setInterval(updateCountdown, 1000);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [durationTimestamp, isCountdownActive]);

  const handleResetCountdown = () => {
    setIsCountdownActive(false);
    setTimeLeft(() => {
      return {
        minutes: 25,
        seconds: 0,
      };
    });
  };

  const handlePlayCountdown = () => {
    setIsCountdownActive(true);
  };

  const handlePauseCountdown = () => {
    setIsCountdownActive(!isCountdownActive);
  };

  return {
    timeLeft,
    setTimeLeft,
    isCountdownActive,
    setIsCountdownActive,
    handlePlayCountdown,
    handlePauseCountdown,
    handleResetCountdown,
  };
};

export default useTimer;
