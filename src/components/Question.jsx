import Options from "./Options";

function Question({ question, answer, onAnswerHandler }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        answer={answer}
        onAnswerHandler={onAnswerHandler}
      />
    </div>
  );
}

export default Question;
