function NextButton({ answer, onNextHandler }) {
  return (
    answer !== null && (
      <button className="btn btn-ui" onClick={onNextHandler}>
        Next
      </button>
    )
  );
}

export default NextButton;
