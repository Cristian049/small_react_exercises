function Progress({ index, numQuestions, points, sumPoints, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        {" "}
        Points <strong>{points}</strong> / {sumPoints}
      </p>
    </header>
  );
}

export default Progress;
