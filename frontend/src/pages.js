import React from 'react';
import * as RegisterLogin from './user/register';
import {NavBar} from './common/navbar.js'
import {Register, Login} from './user/register.js'
import {
	Button, 
	Form, 
	FormGroup, 
	Label, 
	Input, 
	FormText
} from 'reactstrap';

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

export class Courses extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div className="row">
					<div className="col-12">
						<h2>Courses</h2>
						<hr />
					</div>
				</div>
			</div>
		);
	}
}

export class Sections extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div className="row">
					<div className="col-12">
						<h2>Sections</h2>
						<hr />
					</div>
				</div>
			</div>
		);
	}
}

export class CurriculumPage extends React.Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-4">
						<div className="card">
							courses
						</div>
					</div>
					<div className="col-4">
						<div className="card">
							topics
						</div>
					</div>
					<div className="col-4">
						<div className="card">
							goals
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export class SectionPage extends React.Component {
	render() {
		return (
			<div>

			</div>
		);
	}
}

export class SpecificSectionPage extends React.Component {
	render() {
		return (
			<div>

			</div>
		);
	}
}




export class ListCurriculum extends React.Component {
	render() {
		return (
			<div>
				
			</div>
		);
	}
}

export class ListTopics extends React.Component {
	render() {
		return (
			<div>
				
			</div>
		);
	}
}

export class ListCourses extends React.Component {
	render() {
		return (
			<div>
				
			</div>
		);
	}
}

export class EditTopics extends React.Component {
	render() {
		return (
			<div>
				edit topics
			</div>
		);
	}
}

export class EditCourse extends React.Component {
	render() {
		return (
			<div>
				
			</div>
		);
	}
}

export class EditCurriculum extends React.Component {
	render() {
		return (
			<div>
				
			</div>
		);
	}
}

export class EditGoals extends React.Component {
	render() {
		return (
			<div>

			</div>
		);
	}
}

export class ListComments extends React.Component {
	render() {
		return (
			<div>

			</div>
		);
	}
}

