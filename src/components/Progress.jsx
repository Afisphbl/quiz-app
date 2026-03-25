import { useQuiz } from "../context/QuizContext";

function Progress() {
  const { index, numberOfQuestions, points, maxPoints, answer } = useQuiz();
  return (
    <header className="progress">
      <progress
        max={numberOfQuestions}
        value={index + Number(answer !== null)}
      />
      <p>
        Question <strong>{index + 1}</strong>/ {numberOfQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPoints} points
      </p>
    </header>
  );
}

export default Progress;
