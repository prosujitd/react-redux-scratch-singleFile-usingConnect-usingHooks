import React from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { store, increment_ac, decrement_ac } from "../store";

const CounterWithConnect = (props) => {
  return (
    <div>

      <span>
        <button onClick={props.dec}>-</button>
      </span>

      <span style={{ margin: "5px" }}>
        Counter using Connect: {props.counter}
      </span>

      <span>
        <button onClick={()=>props.inc()}>+</button>
      </span>

    </div>
  );
};

const mapStateToProps = (state) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch) => {
  return {
    inc: value => dispatch(increment_ac(value)),
    dec: () => dispatch(decrement_ac())
  };
};

// export default Counter;
export default connect(mapStateToProps, mapDispatchToProps)(CounterWithConnect);
