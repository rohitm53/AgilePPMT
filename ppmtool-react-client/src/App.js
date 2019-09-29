import React, { Component } from 'react';
import "./App.css";
import Dashboard from './components/Dashboard';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard />
      </div>
    );
  }
}
