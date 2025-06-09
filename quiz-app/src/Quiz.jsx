import { useState } from "react";

const questions = [
  {
    question: "Care este capitala Franței?",
    options: ["Berlin", "Madrid", "Paris", "Roma"],
    answer: "Paris",
  },
  {
    question: "Cât face 2 + 2?",
    options: ["3", "4", "5", "22"],
    answer: "4",
  },
  {
    question: "Cine a inventat React?",
    options: ["Facebook", "Google", "Microsoft", "OpenAI"],
    answer: "Facebook",
  },
];

export default function Quiz() {
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [showResult, setShowResult] = useState(false);

  function handleSelect(option) {
    setSelected(option);

    if (option === questions[current].answer) {
      setScore((score) => score + 1);
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected("");
      } else {
        setShowResult(true);
      }
    }, 800);
  }

  function handleReset() {
    setShowResult(false);
    setScore(0);
    setCurrent(0);
    setSelected("");
  }

  if (showResult) {
    return (
      <div className="quiz-box">
        {" "}
        <h2>
          Scorul tau: {score}/{questions.length}
        </h2>
        <button className="option-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-box">
      <h2>{questions[current].question}</h2>
      <p>
        Intrebarea {current + 1} din {questions.length}.
      </p>
      <div className="options">
        {questions[current].options.map((option) => (
          <button
            disabled={!!selected}
            className={`option-btn ${
              selected === option
                ? option === questions[current].answer
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            onClick={() => handleSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
