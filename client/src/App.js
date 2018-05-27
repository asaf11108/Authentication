import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './routes';

import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

import CounterReducer from "./reducers/CounterReducer"

let finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)
// let reducer = combineReducers(CounterReducer)
let store = finalCreateStore(CounterReducer)

class App extends Component {
  render() {
    return (
      <div className="">
        <header className="App App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Express MySql Authentication</h1>
        </header>
        <br />
        <Provider store={store}>
          <Routes />
        </Provider>
      </div>
    );
  }
}

export default App;
