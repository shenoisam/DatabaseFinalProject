import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {NavBar} from './common/navbar.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {CurriculumPage, CoursePage, SectionPage, SpecificSectionPage} from './common/components.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar/>

          hello!

          <Route path="/course" component={CoursePage} />
		      <Route path="/section" component={SectionPage} />
		      <Route path="/specific-section" component={SpecificSectionPage} />
        </div>
      </Router>
    );
  }
}

export default App;
