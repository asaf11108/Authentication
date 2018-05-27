import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="">
        <header className="App App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Express MySql Authentication</h1>
        </header>
        <br />
        <Routes />
      </div>
    );
  }
}

export default App;
