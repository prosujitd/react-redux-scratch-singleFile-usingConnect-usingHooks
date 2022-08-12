import logo from "./logo.svg";
import "./App.css";
import CounterWithConnect from "./components/CounterWithConnect";
import { Provider } from "react-redux";

import store from "./store";
import CounterWithHooks from "./components/CounterWithHooks";

store.subscribe(() => console.log("subscribed value ", store.getState()));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Provider store={store}>
          <h3>Redux -  createStore On Single File</h3>

          <h4 style={{marginBottom:'-3px'}}>using With Connect</h4>
          <CounterWithConnect />

          <h4 style={{marginBottom:'-3px'}}>using With Hooks (useSelector & useDispatch)</h4>
          <CounterWithHooks />

        </Provider>
      </header>
    </div>
  );
}

export default App;
