import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const question = state.questions[state.index];
      const isCorrect = question.correctOption === action.payload;
      const points = isCorrect ? state.points + question.points : state.points;
      return {
        ...state,
        answer: action.payload,
        points: points,
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
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
      };

    default:
      return state;
  }
};

function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  const numberOfQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  function onStartHandler() {
    dispatch({ type: "start" });
  }

  function onAnswerHandler(answer) {
    dispatch({ type: "newAnswer", payload: answer });
  }

  function onNextHandler() {
    dispatch({ type: "nextQuestion" });
  }

  function onFinishHandler() {
    dispatch({ type: "finish" });
  }

  function onRestartHandler() {
    dispatch({ type: "restart" });
  }
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            questionsLen={numberOfQuestions}
            onStartHandler={onStartHandler}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numberOfQuestions={numberOfQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />

            <Question
              question={questions[index]}
              answer={answer}
              onAnswerHandler={onAnswerHandler}
            />

            <NextButton
              index={index}
              numberOfQuestions={numberOfQuestions}
              answer={answer}
              onNextHandler={onNextHandler}
              onFinishHandler={onFinishHandler}
            />
          </>
        )}

        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            onRestartHandler={onRestartHandler}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
