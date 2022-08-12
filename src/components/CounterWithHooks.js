import React from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { store, increment_ac, decrement_ac } from "../store";

const CounterWithHooks = () => {
  const dispatch = useDispatch();
  const counterState = useSelector((state) => state.counter);
  return (
    <div>
      <span>
        <button onClick={()=>dispatch({type:'DECREMENT'})}>-</button>
      </span>
      <span  style={{ margin: "5px" }}>Counter using Hooks: {counterState}</span>
      <span>
        <button onClick={()=>dispatch(increment_ac())}>+</button>
      </span>
    </div>
  );
};

export default CounterWithHooks;;


