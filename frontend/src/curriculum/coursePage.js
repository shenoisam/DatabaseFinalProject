import React from 'react';
import ky from 'ky';
import {Button} from 'reactstrap';
import _ from 'lodash';

export class CoursePage extends React.Component {
	// basically asks a user to display one course at a time
	constructor(props){
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			CourseName: '',
			SubjectCode: '',
			CourseNumber: '',
			CreditHours: '',
			CourseDescription: '',
			error: '',
			errorCourse: '',
		};
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

		const parsed = await ky.post('http://localhost:8888/GetCourses',{json: {
			CourseName: this.state.CourseName
		}}).json();

		if(parsed.r2.length == 1){
			this.state.error = '';
			this.state.SubjectCode = parsed.r2[0].SubjectCode;
			this.state.CourseNumber = parsed.r2[0].CourseNumber;
			this.state.CreditHours = parsed.r2[0].CreditHours;
			this.state.CourseDescription = parsed.r2[0].CourseDescription;
			this.setState(this.state);
			this.render();
		}
		else {
			this.state.error = 'No Course Found. Try Again!';
			this.state.errorCourse = this.state.CourseName;
			this.state.CourseName = '';
			this.state.SubjectCode = '';
			this.state.CourseNumber = '';
			this.state.CreditHours = '';
			this.state.CourseDescription = '';
			this.setState(this.state);
			this.render();
		}
	};

	render() {
		if(!this.state.SubjectCode){
			return (
				<div className="d-lg-flex flex-lg-wrap justify-content-lg-start">
					<div className="col-lg-12" >
						<form name="form" onSubmit={this.onSubmit}>
							<input placeholder="Search for a course" name="CourseName"  className="form-control" checked={this.state.CourseName} onChange={this.handleInputChange} required/>
							<button className="btn float-right register_btn" style={{border:'1px solid'}}>Search for a Course</button>
							{this.state.error && <p> No course named : {this.state.errorCourse} was found </p>}
						</form>
					</div>
				</div>
			);
		}
		else{
			return (
				<div className="d-lg-flex flex-lg-wrap justify-content-lg-start">
					<div className="col-lg-12" >
						<form name="form" onSubmit={this.onSubmit}>
							<input placeholder="Search for a course" name="CourseName"  className="form-control" checked={this.state.CourseName} onChange={this.handleInputChange} required/>
							<button className="btn float-right register_btn" style={{border:'1px solid'}}>Search for a Course</button>
						</form>
						<div className="row">
							<p className="col-md-2"> Course Name: {this.state.SubjectCode}{this.state.CourseNumber} </p>
							<p className="col-md-2"> Credit Hours : {this.state.CreditHours}	</p>
							<p className="col-md-6"> Course Description : {this.state.CourseDescription}	</p>
							<p className="col-md-2"> </p>
						</div>
					</div>
				</div>
			);
		}
	}
}
