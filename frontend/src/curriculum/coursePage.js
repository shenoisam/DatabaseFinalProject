import React from 'react';
import ky from 'ky';
import {BarExample} from "./../common/components.js"
import * as Bessemer from '../alloy/bessemer/components.js';

export class CoursePage extends React.Component {
	// basically asks a user to display one course at a time
	constructor(props){
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			courses: [
				{name: "A+", pv: 0, value: 0 },
				{name: "A", pv: 0, value: 0 },
				{name: "A-", pv: 0, value: 0 },
				{name: "B+", pv: 0, value: 0 },
				{name: "B", pv: 0, value: 0 },
				{name: "B-", pv: 0, value: 0 },
				{name: "C+", pv: 0, value: 0 },
				{name: "C", pv: 0, value: 0 },
				{name: "C-", pv: 0, value: 0 },
				{name: "D+", pv: 0, value: 0 },
				{name: "D", pv: 0, value: 0 },
				{name: "D-", pv: 0, value: 0 },
				{name: "F", pv: 0, value: 0 },
				{name: "W", pv: 0, value: 0 },
				{name: "I", pv: 0, value: 0 },
			],
			CourseName: '',
			SubjectCode: '',
			CourseNumber: '',
			CreditHours: '',
			CourseDescription: '',
			sections: [],
			error: '',
			errorCourse: '',
			Curriculums: [],
			flag:false,
			Spring: "",
			Summer: "",
			Winter: "",
			Fall: "",
			YearUpper: 3000,
			YearLower: 1900,

		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onSubmit2 = this.onSubmit2.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	semester1Change(e){
		if (e != null) {
      this.setState({
        Spring: e
      });
		}
	};
	semester2Change(e){
		if (e != null) {
      this.setState({
        Summer: e
      });
		}
	};
	semester3Change(e){
		if (e != null) {
      this.setState({
        Fall: e
      });
		}
	};
	semester4Change(e){
		if (e != null) {
      this.setState({
        Winter: e
      });
		}
	};

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
			this.state.sections = [];
			this.state.Curriculums = [];
			this.setState(this.state);
			// Get all sections with same CourseName

			const parsed2 = await ky.post('http://localhost:8888/GetAllSections',{json: {
				CourseName: this.state.CourseName
			}}).json();

			for (i = 0; i < parsed2.r2.length; i++) {
				this.state.sections[i] = parsed2.r2[i];
			}

			const parsed3 = await ky.post('http://localhost:8888/GetCourseCurriculums',{json: {
				CourseName: this.state.CourseName
			}}).json();

			const parsed4 = await ky.post('http://localhost:8888/GetSectionByCourseNameYearSemester',{json: {
				CourseName: this.state.CourseName,
				Spring : "Spring",
				Summer : "Summer",
				Winter: "Winter",
				Fall: "Fall",
				YearUpper: 3000,
				YearLower: 1900

			}}).json();
			if(parsed4.r2){
				var data = Object.values(parsed4.r2[0])
				this.state.flag = true
				for (var i = 0; i < data.length;i++){
					this.state.courses[i].pv = data[i]
				}
				console.log(this.state.courses)
				this.setState(this.state);
				this.render();
			}
			console.log("CourseCurriculums: ",parsed4.r2.length);
			for (i = 0; i < parsed3.r2.length; i++) {
				this.state.Curriculums[i] = parsed3.r2[i];
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

	async onSubmit2(event) {
		event.preventDefault();

		const parsed = await ky.post('http://localhost:8888/GetSectionByCourseNameYearSemester',{json: {
			CourseName: this.state.CourseName,
			Spring : this.state.Spring,
			Summer : this.state.Summer,
			Winter: this.state.Winter,
			Fall: this.state.Fall,
			YearUpper: this.state.YearUpper,
			YearLower: this.state.YearLower

		}}).json();
		if(parsed.r2){
			var data = Object.values(parsed.r2[0])
			console.log("The pulled data", data)
			this.state.flag = true
			for (var i = 0; i < data.length;i++){
				this.state.courses[i].pv = data[i]
			}
			console.log(this.state.courses)
			this.setState(this.state);
			this.render();
		}
	}
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
														<button className="col-md-3" style={{float:'right',background:"red"}} onClick={(e) => {this.DeleteSectionFromCourse(section["ID"],section["Semester"],section["Year"],section["CourseName"]);}} > Delete Section  </button>
													</div>
												</div>
											))}
										</div>
						</div>

						<form name="form" onSubmit={this.onSubmit}>
					<div className="input-group form-group">

					</div>
					<div className="row">
						<Bessemer.Select style={{backgroundColor:'black',width:'35%'}} name="Spring"
							className='col-3'
							friendlyName="Spring" placeholder={this.state.Spring}
							options={semesterOptions} value={this.state.Spring}
							onChange={opt => this.semester1Change(opt)}/>
						<Bessemer.Select style={{backgroundColor:'black',width:'35%'}} name="Summer"
							className='col-3'
							friendlyName="Summer" placeholder={this.state.Summer}
							options={semesterOptions1} value={this.state.Summer}
							onChange={opt => this.semester2Change(opt)}/>
						<Bessemer.Select style={{backgroundColor:'black',width:'35%'}} name="Fall"
							className='col-3'
							friendlyName="Fall" placeholder={this.state.Fall}
							options={semesterOptions2} value={this.state.Fall}
							onChange={opt => this.semester3Change(opt)}/>
						<Bessemer.Select style={{backgroundColor:'black',width:'35%'}} name="Winter"
							className='col-3'
							friendlyName="Winter" placeholder={this.state.Winter}
							options={semesterOptions3} value={this.state.Winter}
							onChange={opt => this.semester4Change(opt)}/>
					</div>
					<div className="row" style = {{marginTop:'2%'}}>
					    <input className='col-3' style={{backgroundColor:'white',width:'49%',marginLeft: '15px'}}placeholder="Lower Year" name="YearLower"  className="form-control" checked={this.state.YearLower} onChange={this.handleInputChange} required/>
						<input className='col-3'style={{backgroundColor:'white',width:'48.5%', paddingLeft: '15px'}} placeholder="Upper Year" name="YearUpper"  className="form-control" checked={this.state.YearUpper} onChange={this.handleInputChange} required/>
					</div>
					
					<button className="btn float-right register_btn" style={{border:'1px solid'}}>Does something</button>
				</form>

				{this.state.flag == true &&
					<BarExample data = {this.state.courses}></BarExample>
				}

						<div className="row">
							<div id="sections" className="col-lg-6" >
								<label> Curriculums Part of : </label>
									{this.state.Curriculums.map(section => (
									<div key={section["ID"]} className="col-lg-12 clear" style={{border:'1px solid',marginBottom:'15px'}}>
												<div className="row">
													<p className="col-3"> Name: {section["Name"]}	</p>
													<p className="col-3"> MinimumHours: {section["MinimumHours"]}	</p>
													<p className="col-3"> MaxTopicsCovered: {section["MaxTopicsCovered"]}	</p>
													<p className="col-3"> GoalCredHours: {section["GoalCredHours"]}	</p>
												</div>
											</div>
										))}
										{this.state.Curriculums.length == 0 && <span> None </span> }
								</div>
						</div>
					</div>
				</div>
			);
		}
	}
}


export const semesterOptions = [
	{label: 'YES Spring', value: 'Spring'},
	{label: 'No Spring', value: 'No'},
];
export const semesterOptions1 = [
	{label: 'Yes Summer', value: 'Summer'},
	{label: 'No Summer', value: 'No'},
];
export const semesterOptions2 = [
	{label: 'Yes Fall', value: 'Fall'},
	{label: 'No Fall', value: 'No'},
];
export const semesterOptions3 = [
	{label: 'Yes Winter', value: 'Winter'},
	{label: 'No Winter', value: 'No'},
];
export const semesterOptions4 = [
	{label: 'Winter', value: 'Winter'},
	{label: 'Spring', value: 'Spring'},
	{label: 'Summer', value: 'Summer'},
	{label: 'Fall', value: 'Fall'}
];