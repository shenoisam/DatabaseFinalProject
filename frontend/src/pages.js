import React from 'react';
import {CreateCurriculum} from './curriculum/createCurriculum.js'
import {Register, Login} from './user/register.js'
import {Button} from 'reactstrap';
import ky from 'ky';

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



export class Home extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div className="row">
					<div className="col-12">
            <CreateCurriculum/>
					</div>
				</div>
			</div>
		);
	}
}


export class Courses extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			courses: [],
			goals: [],
			topics: []
		};
	}

	async componentDidMount() {
		// gets all courses
		const parsed = await ky.post('http://localhost:8888/GetAllCurriculums',{json: {
		}}).json();

		// get all goals
		const parsed1 = await ky.post('http://localhost:8888/GetAllCurriculums',{json: {
		}}).json();

		//get all topics
		const parsed2 = await ky.post('http://localhost:8888/GetAllCurriculums',{json: {
		}}).json();

		this.state.courses = parsed;
		this.state.goals = parsed1;
		this.state.topics = parsed2;

		console.log(parsed);
		console.log(parsed1);
		console.log(parsed2);
	}

	render() {
		return (
			<div className="container padded">
				<div className="row">
					<div className="col-12">
						<h2>Courses</h2>
						<hr />
						list all courses
					</div>
				</div>
			</div>
		);
	}
}

export class Sections extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			courses: [],
			goals: [],
			topics: []
		};
	}

	async componentDidMount() {
		// gets all courses
		const parsed = await ky.post('http://localhost:8888/GetAllCurriculums',{json: {
		}}).json();

		// get all goals
		const parsed1 = await ky.post('http://localhost:8888/GetAllCurriculums',{json: {
		}}).json();

		//get all topics
		const parsed2 = await ky.post('http://localhost:8888/GetAllCurriculums',{json: {
		}}).json();

		this.state.courses = parsed;
		this.state.goals = parsed1;
		this.state.topics = parsed2;

		console.log(parsed);
		console.log(parsed1);
		console.log(parsed2);
	}

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


	async componentDidMount() {


		/*const parsed = await ky.post('http://localhost:8888/GetCourses',{json: {
			//Email:this.state.email,
			//Password:this.state.password,
			//FirstName:this.state.fName,
			//LastName:this.state.lName,
		}}).json(); */
	}

	render() {
		return (
			<div className="container-padded">
				<div className="row">
					<div className="col-4">
						<div className="card CurriculumCard">
							courses
						</div>
						<div>
							<Button color="secondary">Courses</Button>
						</div>
					</div>
					<div className="col-4">
						<div className="card CurriculumCard">
							topics
						</div>
						<div>
							<Button color="secondary">Topics</Button>
						</div>
					</div>
					<div className="col-4">
						<div className="card CurriculumCard">
							goals
						</div>
						<div>
							<Button color="secondary">Goals</Button>
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
