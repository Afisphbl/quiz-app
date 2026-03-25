import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

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
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "tick":
      if (state.secondsRemaining <= 1)
        return {
          ...state,
          secondsRemaining: 0,
          status: "finished",
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };

      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
      };

    default:
      return state;
  }
};

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numberOfQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const value = {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    numberOfQuestions,
    maxPoints,
    dispatch,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used within a QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
