function StartScreen({ questionsLen, onStartHandler }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz App</h2>
      <h3>
        {questionsLen} questions to test your knowledge with our interactive
        React quiz!
      </h3>
      <button className="btn btn-ui" onClick={onStartHandler}>
        Let's Start!
      </button>
    </div>
  );
}

export default StartScreen;
