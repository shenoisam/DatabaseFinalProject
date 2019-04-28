import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {NavBar} from './common/navbar.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
