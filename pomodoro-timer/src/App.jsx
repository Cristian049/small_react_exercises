import { useEffect, useState } from "react";

import "./App.css";

const beep = new Audio("/mixkit-correct-answer-tone-2870.wav");

function App() {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isBreak, setIsBreak] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(
    function () {
      let interval = null;
      if (isActive && timeLeft > 0) {
        interval = setInterval(function () {
          setTimeLeft((timeLeft) => timeLeft - 1);
        }, 1000);
      }
      if (isActive && timeLeft === 0) {
        clearInterval(interval);
        if (isBreak) {
          setTimeLeft(1500);
        } else {
          setTimeLeft(300);
        }
        setIsBreak((isBreak) => !isBreak);
        beep.play();
      }

      return () => clearInterval(interval);
    },
    [isActive, timeLeft, isBreak]
  );

  useEffect(
    function () {
      if (!timeLeft) return;
      if (isBreak) {
        document.title = `${minutes} : ${seconds} left from break!`;
      } else if (!isActive && timeLeft === 1500) {
        document.title = "Promodoro timer";
      } else {
        document.title = `${minutes} : ${seconds} left`;
      }
    },
    [timeLeft]
  );

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div>
      <h1>
        {minutes}:{seconds}
      </h1>
      {isBreak ? <h2>It s time to rest!!!</h2> : ""}
      <button onClick={() => setIsActive(true)}>Start</button>
      <button onClick={() => setIsActive(false)}>Stop</button>
      <button
        onClick={() => {
          setIsActive(false);
          setTimeLeft(1500);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
