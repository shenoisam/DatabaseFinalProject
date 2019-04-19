import React from 'react';
import Favicon from 'react-favicon';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class NavBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
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
  							<li className="nav-item active">
  								<a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
  							</li>

  							<li className="nav-item">
  								<a className="nav-link" href="/create">Create User</a>
  							</li>
                <li className="nav-item">
  								<a className="nav-link" href="/courses">Courses</a>
  							</li>
  							<li className="nav-item">
  								<a className="nav-link" href="/sections">Sections</a>
  							</li>
  						</ul>

  						<ul className="navbar-nav" style={{float:'right'}}>

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
  			</div>
		);
	}
}

export { NavBar };
