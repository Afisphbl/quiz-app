import { useReducer, useState } from "react";

const dateReducer = (state, action) => {
  if (action.type === "inc") return state + 1;

  if (action.type === "dec") return state - 1;

  if (action.type === "setCount") return action.payLoad;

  if (action.type === "reset") return 0;

  return state;
};

const stepReducer = (state, action) => {
  console.log(state, action);
  if (action.type === "setStep") return action.payLoad;

  if (action.type === "reset") return 1;

  return state;
};

function DateCounter() {
  const [count, dispatch] = useReducer(dateReducer, 0);
  const [step, setDispatch] = useReducer(stepReducer, 1);

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payLoad: Number(e.target.value) });
  };

  const defineStep = function (e) {
    setDispatch({ type: "setStep", payLoad: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
    setDispatch({ type: "resetStep", payLoad: 1 });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
