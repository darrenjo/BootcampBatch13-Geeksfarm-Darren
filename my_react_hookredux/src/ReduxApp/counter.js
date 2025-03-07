import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, reset } from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  console.log(count);

  const dispatch = useDispatch();

  return (
    <div className="my-4">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span className="fs-2 mx-3">{count}</span>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      <button
        type="button"
        className="btn btn-danger mx-2"
        onClick={() => dispatch(reset())}
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;
