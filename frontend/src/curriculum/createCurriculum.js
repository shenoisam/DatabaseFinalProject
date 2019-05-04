import React from 'react';
import ky from 'ky';
import { sessionService } from 'redux-react-session';

export class CreateCurriculum extends React.Component {
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
<<<<<<< HEAD

		sessionService.loadSession().then(curr => {

			this.state.HeadPerson = curr;
			this.setState(this.state);
		}).catch(err =>
			console.log(err)
		);
		const parsed = await ky.post('http://localhost:8888/GetAllCurriculums',{json: {
		}}).json();
        console.log(parsed)
		this.state.curriculums = parsed;
=======
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
>>>>>>> fc1233bdd02a3438efc453f08eaa57a926a7f880

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
		window.location.reload();
	};


	render() {
		
		return (
			<div className="container padded">
				{this.state.message}Welcome to the Database Dorks !<br/>
				<table>
					<tr><td>Hello World</td></tr>
				<tbody>{this.state.curriculums.map(function(item, key) {
						
						return (
							<tr key = {key}>
								<td>{item.Name}</td>
								<td>{item.MinimumHours}</td>
								<td>{item.MaxTopicsCovered}</td>
								<td>{item.GoalCredHour}</td>
							</tr>
							)
						
						})}</tbody>
				</table>
				
				<form name="form" onSubmit={this.onSubmit}>
        			<input placeholder="Name" name="Name" checked={this.state.Name} onChange={this.handleInputChange} required/>
        			<input placeholder ="MinimumHours"name="MinimumHours" checked={this.state.MinimumHours} onChange={this.handleInputChange} required/>
					<input placeholder ="MaxTopicsCovered" name="MaxTopicsCovered" checked={this.state.MaxTopicsCovered} onChange={this.handleInputChange} required/>
					<input placeholder ="GoalCredHours" name="GoalCredHours" checked={this.state.GoalCredHours} onChange={this.handleInputChange} required/>
        			<button> Create Curriculum </button>
        		</form >
		
			</div>
		);
	}
}
