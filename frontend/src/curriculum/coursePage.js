import React from 'react';
import ky from 'ky';
import {BarExample} from "./../common/components.js"

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
			sections: [],
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
	async DeleteSectionFromCourse(ID,sem,year,CourseName){
		// Adds a course to a curriculum

		const parsed = await ky.post('http://localhost:8888/DeleteSectionFromCourse',{json: {
			ID:ID,
			CourseName:CourseName,
			Semester: sem,
			Year: year
		}}).json();
		window.location.reload()

	}
	

	async onSubmit (event) {
		event.preventDefault();
		

		const parsed = await ky.post('http://localhost:8888/GetCourses',{json: {
			CourseName: this.state.CourseName
		}}).json();

		if(parsed.r2.length === 1){
			// Get Course data
			this.state.error = '';
			this.state.SubjectCode = parsed.r2[0].SubjectCode;
			this.state.CourseNumber = parsed.r2[0].CourseNumber;
			this.state.CreditHours = parsed.r2[0].CreditHours;
			this.state.CourseDescription = parsed.r2[0].CourseDescription;
			this.setState(this.state);
			// Get all sections with same CourseName
			let i = 0;
			const parsed2 = await ky.post('http://localhost:8888/GetAllSections',{json: {
				CourseName: this.state.CourseName
			}}).json();
			console.log(parsed2.r2);
			for (i = 0; i < parsed2.r2.length; i++) {
				this.state.sections[i] = parsed2.r2[i];
			}
			this.setState(this.state);
		}
		else {
			this.state.error = 'No Course Found. Try Again!';
			this.state.errorCourse = this.state.CourseName;
			this.state.CourseName = '';
			this.state.SubjectCode = '';
			this.state.CourseNumber = '';
			this.state.CreditHours = '';
			this.state.CourseDescription = '';
			this.state.sections = [];
			this.setState(this.state);
		}

		this.render();
	};
	/***************************************************/
	// section cards need to be cleared when changing. 
	/***************************************************/
	render() {
	    
		if(!this.state.SubjectCode){
			return (
				<div className="d-lg-flex flex-lg-wrap justify-content-lg-start" style={{marginTop:'20px'}}>
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
				<div className="d-lg-flex flex-lg-wrap justify-content-lg-start" style={{marginTop:'20px'}}>
					<div className="col-lg-12" >
						<form name="form" onSubmit={this.onSubmit}>
							<input placeholder="Search for a course" name="CourseName"  className="form-control" checked={this.state.CourseName} onChange={this.handleInputChange} required/>
							<button className="btn float-right register_btn" style={{border:'1px solid'}}>Search for a Course</button>
						</form>
						<div className="row">
							<p className="col-md-2"> Course Name: {this.state.SubjectCode}{this.state.CourseNumber} </p>
							<p className="col-md-2"> Credit Hours : {this.state.CreditHours}	</p>
							<p className="col-md-6"> Course Description : {this.state.CourseDescription}	</p>
							<p className="col--md-2"> </p>
						</div>
						<div className="row">
							<div id="sections" className="col-lg-6" >
								<label> Sections </label>
								{this.state.sections.map(section => (
										<div key={section["ID"]} className="col-lg-12 clear" style={{border:'1px solid',marginBottom:'15px'}}>
													<div className="row">
														<p className="col-3"> ID: {section["ID"]}	</p>
														<p className="col-6"> Semester : {section["Semester"]+' '+section["Year"]}	</p>
														<button className="col-md-2" style={{float:'right',background:"red"}} onClick={(e) => {this.DeleteSectionFromCourse(section["ID"],section["Semester"],section["Year"],section["CourseName"]);}} > Delete Section  </button>
													</div>
												</div>
											))}
										</div>
							<div className="col-lg-6"><BarExample data = {this.state.courses}/></div>
						</div>
					</div>
				</div>
			);
		}
	}
}
