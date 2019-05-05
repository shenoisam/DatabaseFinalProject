import React from 'react';
import ky from 'ky';
import { sessionService } from 'redux-react-session';

export class CreateTopic extends React.Component {
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = {
			ID : '',
            Units : '', 
            Level: '',
            Name : '', 
            SubjectArea : '' 
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
		const parsed = await ky.post('http://localhost:8888/CreateTopic',{json: {
			ID         : this.state.ID,
            Units      : this.state.Units,
		    Level      : this.state.Level,
			Name       : this.state.Name,
            SubjectArea: this.state.SubjectArea,
		}}).json();
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
						<input placeholder ="Units"name="Units"  className="form-control" checked={this.state.Units} onChange={this.handleInputChange} required/>
					</div>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-key"></i></span>
					</div>
						<input placeholder ="Level" name="Level"  className="form-control" checked={this.state.Level} onChange={this.handleInputChange} required/>
					</div>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-key"></i></span>
					</div>
						<input placeholder ="Name" name="Name"  className="form-control" checked={this.state.Name} onChange={this.handleInputChange} required/>
					</div>
             <div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-user"></i></span>
					</div>
						<input placeholder="SubjectArea" name="SubjectArea"  className="form-control" checked={this.state.SubjectArea} onChange={this.handleInputChange} required/>
					</div>
					<button className="btn float-right register_btn" style={{border:'1px solid'}}>Create Topic</button>
				</form>
			</div>
		);
	}
}
