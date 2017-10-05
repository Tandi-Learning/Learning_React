import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TestButton from './Button';
import { Greeting } from './Greeting';

class App extends Component {
  // if title is set to a value type of number 2017, the warning will show up on the console
  title = "2017"; 

  render() {    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Greeting title={this.title}></Greeting>
          <TestButton></TestButton>
        </div>

      </div>
    );
  }
}

export default App;
