import React from 'react';
import * as RegisterLogin from './user/register';
import {NavBar} from './common/navbar.js'
import {Register, Login} from './user/register.js'

export class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			message: ' '
		};
	}

	render() {
		return (
			<div className="container padded">
				{this.state.message}Welcome to the Database Dorks !<br/>
			</div>
		);
	}
}

export class RegisterPage extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div className="row">
					<div className="col-12">
						<h2>Register</h2>
						<hr />
            <Register/>
					</div>
				</div>
			</div>
		);
	}
}

export class LoginPage extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div className="row">
					<div className="col-12">
						<h2>Login</h2>
						<hr />
            <Login/>
					</div>
				</div>
			</div>
		);
	}
}
