import React, { Component } from 'react';
import './App.css';
import {NavBar} from './common/navbar.js'

class Appp extends Component {
  render() {
    return (
        <div className="App">
          <NavBar/>

          Hello! This is the home page!

        </div>
    );
  }
}

export default Appp;
