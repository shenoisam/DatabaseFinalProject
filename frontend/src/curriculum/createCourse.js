import React from 'react';
import ky from 'ky';
import { sessionService } from 'redux-react-session';

export class CreateCourse extends React.Component {
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = {
			CourseName: '',
			SubjectCode: '',
      CourseNumber: '',
			CreditHours: '',
			CourseDescription: '',
      HeadPerson: '',
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
			const parsed = await ky.post('http://localhost:8888/CreateCourses',{json: {
				CourseName: this.state.CourseName,
				SubjectCode: this.state.SubjectCode,
			  CourseNumber: this.state.CourseNumber,
				CreditHours: this.state.CreditHours,
        CourseDescription: this.state.CourseDescription,
				HeadPerson: this.state.HeadPerson
			}}).json();
			console.log(this.state.CourseName);
			console.log(this.state.SubjectCode);
      console.log(parsed);
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
						<input placeholder="CourseName" name="CourseName"  className="form-control" checked={this.state.CourseName} onChange={this.handleInputChange} required/>
					</div>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-key"></i></span>
					</div>
						<input placeholder ="SubjectCode"name="SubjectCode"  className="form-control" checked={this.state.SubjectCode} onChange={this.handleInputChange} required/>
					</div>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-key"></i></span>
					</div>
						<input placeholder ="CourseNumber" name="CourseNumber"  className="form-control" checked={this.state.CourseNumber} onChange={this.handleInputChange} required/>
					</div>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-key"></i></span>
					</div>
						<input placeholder ="CreditHours" name="CreditHours"  className="form-control" checked={this.state.CreditHours} onChange={this.handleInputChange} required/>
					</div>
          <div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-user"></i></span>
					</div>
						<input placeholder="CourseDescription" name="CourseDescription"  className="form-control" checked={this.state.CourseDescription} onChange={this.handleInputChange} required/>
					</div>
					<button className="btn float-right register_btn" style={{border:'1px solid'}}>Create Course</button>
				</form>
			</div>
		);
	}
}
