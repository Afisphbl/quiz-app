import { useQuiz } from "../context/QuizContext";

function StartScreen() {
  const { numberOfQuestions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to the React Quiz App</h2>
      <h3>
        {numberOfQuestions} questions to test your knowledge with our
        interactive React quiz!
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start!
      </button>
    </div>
  );
}

export default StartScreen;
