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
  isCountdownPaused: boolean;
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

  const [isCountdownPaused, setIsCountdownPaused] =
    React.useState<boolean>(false);

  const intervalRef = React.useRef<number | null>(0);
  const targetTimestampRef = React.useRef<number | null>(null);

  const handlePlayCountdown = () => {
    const duration = timeLeft.minutes * 60 * 1000 + timeLeft.seconds * 1000; // duration in ms
    targetTimestampRef.current = Date.now() + duration;

    setIsCountdownActive(true);
    setIsCountdownPaused(false);
  };

  React.useEffect(() => {
    const updateCountdown = () => {
      if (!targetTimestampRef.current) return;

      const remaining = targetTimestampRef.current - Date.now();

      if (remaining <= 0) {
        setTimeLeft({ minutes: 0, seconds: 0 });
        setIsCountdownActive(false);
        window.clearInterval(intervalRef.current!);
        return;
      }

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
  }, [isCountdownActive]);

  const handleResetCountdown = () => {
    setIsCountdownActive(false);
    setTimeLeft(() => {
      return {
        minutes: 25,
        seconds: 0,
      };
    });
  };

  const handlePauseCountdown = () => {
    setIsCountdownActive(!isCountdownActive);
    setIsCountdownPaused(true);
  };

  return {
    timeLeft,
    setTimeLeft,
    isCountdownActive,
    isCountdownPaused,
    setIsCountdownActive,
    handlePlayCountdown,
    handlePauseCountdown,
    handleResetCountdown,
  };
};

export default useTimer;
