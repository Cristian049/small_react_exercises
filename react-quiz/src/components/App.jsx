import { useEffect, useReducer } from "react";

import "../index.css";

import Header from "./Header";
import MainCont from "./MainCont";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import SelectNumber from "./SelectNumber";

const SECS_PER_QUESTION = 30;

let storedHighScore = 0;
try {
  const value = localStorage.getItem("highscore");
  storedHighScore = value ? JSON.parse(value) : 0;
} catch {
  storedHighScore = 0;
}

const initialState = {
  questions: [],
  // 'loading','ready', 'error', 'active','finished', 'selecting'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: storedHighScore,
  secondsRemaining: null,
  numberOfQuestions: 0,
};
function reduce(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "selecting",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.numberOfQuestions * SECS_PER_QUESTION,
      };
    case "selectNumOfQuestions":
      return {
        ...state,
        status: "ready",
        numberOfQuestions: action.payload,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "selecting",
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      numberOfQuestions,
    },
    dispatch,
  ] = useReducer(reduce, initialState);

  const numQuestions = numberOfQuestions;

  const selectedQuestions = questions.slice(0, numQuestions);

  const sumPoints = selectedQuestions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  useEffect(
    function () {
      localStorage.setItem("highscore", JSON.stringify(highscore));
    },
    [highscore]
  );

  return (
    <div className="app">
      <Header />
      <MainCont>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "selecting" && (
          <SelectNumber
            dispatch={dispatch}
            numberOfQuestions={numberOfQuestions}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              sumPoints={sumPoints}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            sumPoints={sumPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </MainCont>
    </div>
  );
}
