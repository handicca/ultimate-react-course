/* eslint-disable react/prop-types */
import { useEffect } from "react";

function Timer({ dispatch, secondsRemining }) {
  const mins = Math.floor(secondsRemining / 60);
  const seconds = secondsRemining % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
