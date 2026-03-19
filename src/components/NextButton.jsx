function NextButton({
  index,
  numberOfQuestions,
  answer,
  onNextHandler,
  onFinishHandler,
}) {
  if (index < numberOfQuestions - 1) {
    return (
      answer !== null && (
        <button className="btn btn-ui" onClick={onNextHandler}>
          Next
        </button>
      )
    );
  }

  if (index === numberOfQuestions - 1) {
    return (
      answer !== null && (
        <button className="btn btn-ui" onClick={onFinishHandler}>
          Finish
        </button>
      )
    );
  }
}

export default NextButton;
