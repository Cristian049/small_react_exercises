import { useState } from "react";

export default function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const date = new Date("May 13 2025");
  date.setDate(date.getDate() + count);
  function handleStep(e) {
    setStep(Number(e.target.value));
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  function handleCount(e) {
    setCount(Number(e.target.value));
  }
  function incrementCount() {
    setCount((c) => c + step);
  }
  function decrementCount() {
    setCount((c) => c - step);
  }
  function resetStates() {
    setCount(0);
    setStep(1);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="range"
          min="1"
          max="10"
          onChange={handleStep}
          value={step}
        />

        <span>{step}</span>
      </div>
      <div>
        <button onClick={decrementCount}>-</button>
        <input type="text" value={count} onChange={handleCount} />
        <button onClick={incrementCount}>+</button>
      </div>
      <div>
        {count === 0
          ? "Today is "
          : count > 0
          ? `${count} days from today is `
          : `${Math.abs(count)} days ago was `}
        {} {date.toDateString()}
      </div>
      {step !== 1 || count !== 0 ? (
        <button onClick={resetStates}>Reset</button>
      ) : null}
    </form>
  );
}
