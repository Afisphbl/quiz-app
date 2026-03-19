function FinishedScreen({ points, maxPoints, highscore, onRestartHandler }) {
  const percentage = Math.ceil((points / maxPoints) * 100);
  let emoji;

  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "😁";
  if (percentage >= 0 && percentage < 50) emoji = "🤔";
  if (percentage === 0) emoji = "😔";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scrored <strong>{points}</strong> out of {maxPoints} points (
        {percentage}%).
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>

      <button className="btn btn-ui" onClick={onRestartHandler}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishedScreen;
