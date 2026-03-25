import { useQuiz } from "../context/QuizContext";

function NextButton() {
  const { index, numberOfQuestions, answer, dispatch } = useQuiz();
  if (index < numberOfQuestions - 1) {
    return (
      answer !== null && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )
    );
  }

  if (index === numberOfQuestions - 1) {
    return (
      answer !== null && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      )
    );
  }
}

export default NextButton;
