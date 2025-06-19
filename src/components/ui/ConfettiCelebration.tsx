import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

interface ConfettiCelebrationProps {
  active: boolean;
}

const ConfettiCelebration = ({ active }: ConfettiCelebrationProps) => {
  const { width, height } = useWindowSize();
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (active) {
      setIsRunning(true);
      const timer = setTimeout(() => setIsRunning(false), 5000); // Run for 5 seconds
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!isRunning) {
    return null;
  }

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={200}
      recycle={false}
      gravity={0.15}
      onConfettiComplete={() => setIsRunning(false)}
    />
  );
};

export default ConfettiCelebration;
