import  {  createStore,applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

const middlewares = [thunk]; // Can added other multiple middlewares
const initialState = 1;

// Reducers
const counterReducer = function (state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;

    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

// Combine Reducers

const rootReducer = combineReducers({
  counter: counterReducer,
});

// Actions => communicate with API and update state by calling dispatch
export const increment_ac = () => {
  return function (dispatch) {        // TO return such function redux-thunk must be used as middleware
    dispatch({ type: "INCREMENT" });
  };
};

export const decrement_ac = () => {
  return function (dispatch) {      // TO return such function redux-thunk must be used as middleware
    dispatch({ type: "DECREMENT" });
  };
};

// Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),  // ReduxDevTools with Middlewares
  
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__  (),  // ReduxDevTools withOut Middlewares

  // applyMiddleware(...middlewares)  // Only Middleware WithOut ReduxDevTools
);

export default store;


