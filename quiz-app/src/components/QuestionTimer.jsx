import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remaingTime, setRemaingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaingTime((prevRemaingTime) => prevRemaingTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      value={remaingTime}
      max={timeout}
      className={mode}
    />
  );
}
