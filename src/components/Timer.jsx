import { useEffect } from "react";

function Timer({ secondsRemaining, onTickHandler }) {
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(onTickHandler, 1000);
      return () => clearInterval(id);
    },
    [onTickHandler],
  );

  return (
    <div className="timer">
      {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
    </div>
  );
}

export default Timer;
