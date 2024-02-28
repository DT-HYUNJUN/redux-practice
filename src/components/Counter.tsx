import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { decrement, increment, incrementAsync, incrementByAmount } from "../state/counter/counterSlice";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={() => dispatch(decrement())}>decrement</button>
        <button onClick={() => dispatch(increment())}>increment</button>
        <button onClick={() => dispatch(incrementByAmount(2))}>increment by amount 2</button>
        <button onClick={() => dispatch(incrementAsync(2))}>increment async</button>
      </div>
    </div>
  );
};

export default Counter;
