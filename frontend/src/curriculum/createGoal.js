import React from 'react';
import ky from 'ky';
import * as Bessemer from '../alloy/bessemer/components.js'
import { sessionService } from 'redux-react-session';
export class CreateGoal extends React.Component {
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = {
			ID : '',
            Description : '',
            Curriculum: '',
		};
	}

	async componentDidMount() {
		sessionService.loadSession().then(curr => {
			console.log("UserID: ", curr)
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
		const parsed = await ky.post('http://localhost:8888/CreateGoals',{json: {
			ID               : this.state.ID,
      Description      : this.state.Description,
		  Curriculum       : this.state.Curriculum,
		}}).json();

		console.log(parsed)
		if(!parsed.err)
			window.location.reload();
	};

	render() {
		return (
			<div>
				<form name="form" onSubmit={this.onSubmit}>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-user"></i></span>
					</div>
						<input placeholder="ID" name="ID"  className="form-control" checked={this.state.ID} onChange={this.handleInputChange} required/>
					</div>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-key"></i></span>
					</div>
						<input placeholder ="Description"name="Description"  className="form-control" checked={this.state.Description} onChange={this.handleInputChange} required/>
					</div>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-key"></i></span>
					</div>
						<input placeholder ="Curriculum" name="Curriculum"  className="form-control" checked={this.state.Curriculum} onChange={this.handleInputChange} required/>
					</div>

					<button className="btn float-right register_btn" style={{border:'1px solid'}}>Create Goal</button>
				</form>
			</div>
		);
	}
}
