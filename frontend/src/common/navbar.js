import React from 'react';
import Favicon from 'react-favicon';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Register, Login} from '../user/register.js'
import {CurriculumPage, CoursePage, SectionPage, SpecificSectionPage} from './components.js';

class NavBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
      <Router>
  			<div>
  				<nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
  					<a className="navbar-brand" href="/">Database Final</a>
  					<button className="navbar-toggler" type="button" data-toggle="collapse"
  							data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
  							aria-expanded="false" aria-label="Toggle navigation">
  						<span className="navbar-toggler-icon"></span>
  					</button>

  					<div className="collapse navbar-collapse" id="navbarSupportedContent">
  						<ul className="navbar-nav mr-auto">
  							{/* <li className="nav-item active">
  								<a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
  							</li> */}

                			{/* <li className="nav-item">
  								<a className="nav-link" href="/course">Courses</a>
  							</li>
  							<li className="nav-item">
  								<a className="nav-link" href="/section">Sections</a>
  							</li> */}
  						</ul>

  						<ul className="navbar-nav" style={{float:'right'}}>

							{/* if theyre logged in lets display their username */}
  							<li className="nav-item">
  								<a className="nav-link" href="/register">Register</a>
  							</li>

  							<li className="nav-item">
  								<a className="nav-link" href="/login">Login</a>
  							</li>

  							<li className="nav-item">
  								<a className="nav-link" href="#/" > Log Out</a>
  							</li>

  						</ul>
  					</div>
  				</nav>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />

  			</div>
      </Router>
		);
	}
}

export { NavBar };
