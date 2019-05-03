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
import ky from 'ky';
import { sessionReducer } from 'redux-react-session';
import { sessionService } from 'redux-react-session';



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
	// basically list all curriculum in the database
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = {
			curriculums: [],
			Name: 'empty',
			HeadPerson: '',
			MinimumHours: 'mydogdied',
			MaxTopicsCovered: 'ihatechicken',
			GoalCredHour: 'none'
		};
		
	}

	async componentDidMount() {
		sessionService.loadSession().then(curr => {
			console.log("UserID: ", curr)
			this.state.HeadPerson = curr.id;
			this.setState(this.state);
			console.log(curr)
		}).catch(err =>
			console.log(err)
		);
		const parsed = await ky.post('http://localhost:8888/GetAllCurriculums',{json: {
		}}).json();

		this.state.curriculums = parsed;
		
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
		[name]: value
		});
  }

	async onSubmit (event) {
		event.preventDefault();
        if (this.state.HeadPerson){
			const parsed = await ky.post('http://localhost:8888/CreateCurriculum',{json: {
			Name: this.state.Name,
			MinimumHours: this.state.MinimumHours,
			MaxTopicsCovered: this.state.MaxTopicsCovered,
			GoalCredHours: this.state.GoalCredHours,
			HeadPerson: this.state.HeadPerson
			}}).json();
			console.log("Sent the data: ",parsed);
			if(!parsed.err){
				sessionService.saveSession(parsed);
				this.state.id = parsed;
				this.setState(this.state);
		}


		}else {
			console.log(this.state.HeadPerson)
		}
		
		//window.location.reload();
		
	};


	render() {
		let temp = [];
		for(let i = 0; i < this.state.curriculums; i++){
			temp.push(
				<div>
					<div>
						{this.state.curriculums[i].Name}
					</div>
					<div>
						{this.state.curriculums[i].MinimumHours}
					</div>
					<div>
						{this.state.curriculums[i].MaxTopicsCovered}
					</div>
					<div>
						{this.state.curriculums[i].GoalCredHour}
					</div>
				</div>
			)
		}
		return (
			<div className="container padded">
				{this.state.message}Welcome to the Database Dorks !<br/>

				<form name="form" onSubmit={this.onSubmit}>
        			<input placeholder="Name" name="Name" checked={this.state.Name} onChange={this.handleInputChange} />
        			<input placeholder ="MinimumHours"name="MinimumHours" checked={this.state.MinimumHours} onChange={this.handleInputChange} />
					<input placeholder ="MaxTopicsCovered" name="MaxTopicsCovered" checked={this.state.MaxTopicsCovered} onChange={this.handleInputChange} />
					<input placeholder ="GoalCredHours" name="GoalCredHours" checked={this.state.GoalCredHours} onChange={this.handleInputChange} />
        			<button> Create Curriculum </button>
        		</form >

				{temp}
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

