import React from 'react';
import ky from 'ky';
import { sessionService } from 'redux-react-session';

export class CreateCurriculum extends React.Component {
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = {
			Name: '',
			HeadPerson: '',
			MinimumHours: '',
			MaxTopicsCovered: '',
			GoalCredHour: ''
		};
	}

	async componentDidMount() {
		sessionService.loadSession().then(curr => {
			console.log("UserID: ", curr)
			this.state.HeadPerson = curr;
			this.setState(this.state);
		}).catch(err =>
			console.log(err)
		);
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
			window.location.reload();
		}else {
			console.log(this.state.HeadPerson)
		}
	};

	render() {
		return (
			<div>
				<form name="form" onSubmit={this.onSubmit}>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-user"></i></span>
					</div>
						<input placeholder="Name" name="Name"  className="form-control" checked={this.state.Name} onChange={this.handleInputChange} required/>
					</div>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-key"></i></span>
					</div>
						<input placeholder ="MinimumHours"name="MinimumHours"  className="form-control" checked={this.state.MinimumHours} onChange={this.handleInputChange} required/>
					</div>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-key"></i></span>
					</div>
						<input placeholder ="MaxTopicsCovered" name="MaxTopicsCovered"  className="form-control" checked={this.state.MaxTopicsCovered} onChange={this.handleInputChange} required/>
					</div>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-key"></i></span>
					</div>
						<input placeholder ="GoalCredHours" name="GoalCredHours"  className="form-control" checked={this.state.GoalCredHours} onChange={this.handleInputChange} required/>
					</div>
					<button className="btn float-right register_btn" style={{border:'1px solid'}}>Create Curriculum</button>
				</form>
			</div>
		);
	}
}
