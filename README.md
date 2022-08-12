# React Redux - Scratch - on Single File - using Both connect AND Hooks
Redux code is written on single file "store.js" and 2 components are created for the same purpose using 2 different ways

# Building Parts of Redux
Redux requires three main building parts to function: actions, reducers, and store.
    => A store — an object that holds the app state data
    => A reducer — a function that returns some state data, triggered by an action type
    => An action — an object that tells the reducer how to change the state. It must contain a type property, and it can contain an optional payload property

## Actions
Actions are objects that are used to send data to the Redux store. They typically have two properties: a type property for describing what the action does and a payload property that contains the information that should be changed in the app state.

// counterAction.js
export const incrementAction = payload => {
  return function(dispatch){
    dispatch({ type: "INCREMENT" });
  }
};

export default incrementAction;

Note: The type is usually in all caps with its words separated by underscores. For example, SIGNUP_USER or DELETE_USER_DATA.

## Reducers
Reducers are pure functions that implement the action’s behavior. They take the current application state, perform an action, and then return a new state.

const counterReducer = (state, action) => {
  const { type, payload } = action;
  switch(action.type){
    case "INCREMENT":
      return {
        state + action.payload
      };
    default:
      return state;
  }
};

export default reducer;

## Store
The application’s state is housed in the store. There is only one store in any Redux application:

import { createStore } from 'redux'

const store = createStore(counterReducer);

NOte: Since our application can only have one Redux store, to create a single root reducer for all our components (i.e. reducers for each component), we’ll need the combineReducers method from Redux.

# connect() method
connect()method just provides a way for the user to connect the component to the redux store. It provides its connected component with the pieces of the data it needs from the store (incoming data), and the functions (outgoing function) it can use to dispatch actions to the store. It does not modify the component class passed to it; instead, it returns a new, connected component class that wraps the component we passed in.

## connect() params
connect accepts 4 params, all optional.
    mapStateToProps     => Function
    mapDispatchToProps  => Function | Object
    mergeProps          => Function
    options             => Object

1. mapStateToProps: (state, ownProps)
If this method is defined that means that the component is going to subscribe to the redux state and it will get triggered if the state changes. The results of mapStateToProps must be a plain object, which will be merged into the wrapped component’s props. If we don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps.

* state is the current redux state
* ownProps of newly created wrapper component

2. mapDispatchToProps: object | (dispatch, ownProps)
The return of your mapDispatchToProps functions are regarded as dispatchProps. It will be merged as props to your connected component.

* dispatch dispatch of your store that we can use to dispatch actions
* ownProps — this is the similar to the ownProps passed for mapStateToProps

3. mergeProps: (stateProps, dispatchProps, ownProps)
If specified, defines how the final props for your own wrapped component are determined. If you do not provide mergeProps, your wrapped component receives { ...ownProps, ...stateProps, ...dispatchProps } by default.

These params are a result of wrapper component’s props, mapStateToProps(), mapDispatchToProps()respectively.

The return value of mergeProps is referred to as mergedProps and the fields will be used as the props for the wrapped component.

4. options: Object
{  
  context?: Object,  
  pure?: boolean,  
  areStatesEqual?: Function,  
  areOwnPropsEqual?: Function,  
  areStatePropsEqual?: Function,  
  areMergedPropsEqual?: Function,  
  forwardRef?: boolean,
}

## What will connect() return
It returns a wrapper function that takes your component and returns a wrapper component with the additional props that were added.

## Accessing Own Props
If we pass no params or 2 params to the mapStateToProps method, we can access ownProps like below else if we pass only 1 param explicitly, we cannot access ownProps.

const mapStateToProps = (state, ownProps) => {  
  console.log(state) // state  
  console.log(ownProps) // ownProps
}

//or 

function mapStateToProps() {  
  console.log(arguments[0]) // state  
  console.log(arguments[1]) // ownProps
}

//or 

const mapStateToProps = (...args) => {  
  console.log(args[0]) // state  
  console.log(args[1]) // ownProps
}

# Redux Hooks - useSelector and useDispatch
React Redux offers a set of Hooks as an alternative to the existing connect() higher order component. These Hooks allow us to connect to the Redux store and dispatch actions without having to wrap your components in connect().

Before Hooks, we always used a connect() which is a higher-order component and wrapper to our component, connect() read values from the Redux store.

connect() takes two arguments, both optional:
    - mapStateToProps
    - mapDispatchToProps

mapStateToProps:
called every time the store state changes. It receives the entire store state and should return an object of data this component needs.

mapDispatchToProps:
This parameter can either be a function, or an object. If it’s a function, it will be called once on component creation. It will receive dispatch as an argument and should return an object full of functions that use dispatch to dispatch actions.

## using Hooks
Let's move towards react-redux hooks. React-Redux now offers a set of hook APIs as an alternative to existing connect() Higher-Order Component. These APIs allow you to subscribe to the Redux store and dispatch actions, without having to wrap your components in connect(). By using the Hook API with Function components, components are kept small and the code remains clean.

### useSelector
The equivalent of mapStateToProps is useSelector. It takes in a function argument that returns the part of the state that we want. 

useSelector() hook is equivalent of mapStateToProps. useSelector is a function that takes the current state as an argument and returns whatever data we want from it and it allows us to store the return values inside a variable within the scope of our functional components instead of passing down as props

### useDispatch
The equivalent of map dispatch to props is useDispatch. We will invoke useDispatch and store it to a variable, dispatch. Dispatch will work with the allActions imported from the actions folder. 
useDispatch() hook is equivalent of mapDispatchToProps.We will invoke useDispatch and store it to a variable, dispatch. This hook returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.
And we dispatch it by calling dispatch passing in the return value from the action creator.

### useStore()
useStore() hook returns a reference to the same Redux store that was passed into Provider component.

This hook should probably not be used frequently. Prefer useSelector() as your primary choice. However, this may be useful for less common scenarios that do require access to the store, such as replacing reducers.

const store = useStore()
// The component will not automatically update if the store state changes
return <div>{store.getState().obj.name}</div>







## Steps using Connect method

1. npm install redux, react-redux, redux-thunk
2. create store.js in root folder (under src)
3. Inside store.js
    - Import {createStore, applyMiddleware, combineReducers, compose} from redux
    - Import thunk from redux-thunk
4. Inside store.js - Working With Reducers
    - create reducers which accepts 2 args i.e. state and action
    - use the switch case to handle according to action.type
5. Inside store.js - Working with CombineReducers
    - Combine multiple reducers using combine reducers into rootReducers
6. Inside store.js - Working with Actions
    - Write down the action so that it could dispatch to reducers and export it
    - Action is written which must have another "return function(dispatch)" that must be return back
7. Inside store.js - Working with STORE
    - create the store that accepts 2 args
    - 1st arg: rootReducer
    - 2nd arg: composeEnhancers(applyMiddleware(...middlewares))
    - where composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;    
    - export the store

8. Inside main component app.js - Working with Provider
    - Import Provider from "react-redux"
    - Use a Provider component that receives store as props. This is what grants access to our store from all the components wrapped in it.

9. Inside the component where we want to work with state - Working with State

    using HOOKS
    -----------
    - We have a hook called useDispatch() (that we'll use to dispatch actions) and another called useSelector() (that we'll use to read the state from the store).
    - useSelector is to get the state value 
    - Make sure redux-thunk is used as middleware otherwise it wont works as Async in action function
    - useDispatch is to call the action function

    OR using connect
    ----------------
    - define mapStateToProps and mapDispatchToProps
    - export default connect(mapStateToProps, mapDispatchToProps)(CounterWithConnect);