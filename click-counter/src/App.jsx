import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);
  const [time, setTime] = useState(5);
  const [started, setStarted] = useState(false);

  function handleCounter() {
    setCounter((count) => count + 1);
  }

  function handleStart() {
    setStarted(true);
  }

  function handleReset() {
    setCounter(0);
    setTime(5);
    setStarted(false);
  }

  function onTimeEnd() {
    return <h2>Time is up, you've got {counter} clicks.</h2>;
  }

  useEffect(
    function () {
      if (!started || time === 0) {
        console.log("Timer stopped");
        return;
      }

      const interval = setInterval(() => {
        if (time > 0) {
          setTime((t) => t - 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    },
    [started, time]
  );
  return (
    <div>
      <h2>
        {!started && "Start the click counter challange"}
        {started && time > 0 && `You have ${time} seconds left!`}
        {started && time === 0 && onTimeEnd()}
      </h2>
      {!started ? <button onClick={handleStart}>Start</button> : ""}
      {started && time > 0 && <button onClick={handleCounter}>+1</button>}
      {started && time === 0 && <button onClick={handleResetm}>Reset</button>}
    </div>
  );
}

export default App;
