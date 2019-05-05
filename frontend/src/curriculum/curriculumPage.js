import React from 'react';
import ky from 'ky';
import Checkbox from '../common/checkbox.js';
import * as Bessemer from '../alloy/bessemer/components.js';

export class CurriculumPagee extends React.Component {
	// basically list all curriculum in the database
	constructor(props){
		super(props);
		this.state = {
			curriculums: [],
			Name: '',
			HeadPerson: '',
			MinimumHours: '',
			MaxTopicsCovered: '',
			GoalCredHour: '',
			ShowingCurr:[],
			Courses:[],
			MyCourses:[],
			Topics:[],
			Goals:[],
			Required:[],
		};
	}

	async componentDidMount() {
		let i = 0;
		const parsed = await ky.post('http://localhost:8888/GetAllCurriculums',{json: {
		}}).json();
		for (i = 0; i < parsed.r2.length; i++) {
			this.state.curriculums[i] = parsed.r2[i];
			this.state.ShowingCurr[parsed.r2[i].Name] = false;
		}
		this.setState(this.state);
	}

	handleCheckboxChange(e) {
      this.state.Required.set(e, !this.state.Required.get(e));
      this.setState(this.state);
      console.log(e + ' set to ' + this.state.Required.get(e));
  }

	setOtherCurriculumToFalse(name){
		for (var i = 0; i < this.state.curriculums.length; i++) {
			let j = this.state.curriculums[i]
			this.state.ShowingCurr[j.Name] = false;
		}
		this.state.ShowingCurr[name] = true;
		this.setState(this.state);
	}

	async updateComp(name){
		const parsed1 = await ky.post('http://localhost:8888/GetCurriculumCourses',{json: {
			Curriculum: name
		}}).json();

		const parsed2 = await ky.post('http://localhost:8888/GetCoursesNotInCurriculum',{json: {
			Curriculum: name
		}}).json();

		console.log(parsed1)
		console.log(parsed2)

		if(parsed1.r2){
			for (let i = 0; i < parsed1.r2.length; i++) {
				this.state.MyCourses[i] = parsed1.r2[i]
			}
		}

		if(parsed2.r2){
			for (let i = 0; i < parsed2.r2.length; i++) {
				this.state.Courses[i] = parsed2.r2[i]
			}
		}

		this.setState(this.state)
		this.render()
	}

	async clickedCurriculum(name){
		// Updates all courses,topics,and goals linked to a curriculum
		this.setOtherCurriculumToFalse(name)
		this.updateComp(name)

	}

	requiredChange(e,name){
		if (e != null) {
			this.state.Required[name]= e
      this.setState(this.state);
		}
	};

	async addCurriculumAndCourse(nameCur,nameCourse){
		// Adds a course to a curriculum
		console.log(this.state.Required[nameCourse]);
		const parsed = await ky.post('http://localhost:8888/CreateCurCourse',{json: {
			Curriculum:nameCur,
			CourseName:nameCourse,
			Required:this.state.Required[nameCourse]
		}}).json();
		console.log(parsed)
		this.updateComp(nameCur)
	}

	render() {
		return (
			<div className="d-lg-flex flex-lg-wrap justify-content-lg-start">
      {this.state.curriculums.map(curriculum => (
        <div key={curriculum["Name"]} className="col-lg-12" style={{border:'1px solid',marginBottom:'20px'}}>
					<div className="row">
						<p className="col-2"> Name: {curriculum["Name"]}	</p>
						<p className="col-2"> Minimum Hours : {curriculum["MinimumHours"]}	</p>
						<p className="col-2"> Max Topics : {curriculum["MaxTopicsCovered"]}	</p>
						<p className="col-2"> Goal Credit Hours : {curriculum["GoalCredHours"]}	</p>
						<p className="col-2"> </p>
						<button className="col-md-2" style={{float:'right'}} onClick={(e) => {this.clickedCurriculum(curriculum["Name"]);}} > View Curriculum </button>
					</div>
					<hr></hr>
					{(this.state.ShowingCurr[curriculum["Name"]] === true) &&
						<div className="row" >
								<div className="col-lg-4">
									<label> Courses </label>
									{this.state.MyCourses.map(course => (
										<div key={course["CourseName"]} className="col-lg-12" style={{border:'1px solid',marginBottom:'5px'}}>
											<div className="row">
												<p className="col-lg-8"> Name: {course["CourseName"]}	</p>
											</div>
										</div>
									))}
								{this.state.Courses.map(course => (
									<div key={course["CourseName"]} className="col-lg-12" style={{border:'1px solid',marginBottom:'20px'}}>
										<div className="row">
											<p className="col-lg-8"> Name: {course["CourseName"]}	</p>
												<Bessemer.Select className="form-control" style={{backgroundColor:'black',width:'35%'}} name="Required"
						            			className='col-5'
						                  friendlyName="Required" placeholder={this.state.Required[course["CourseName"]]}
						                  options={requiredOptions} value={this.state.Required[course["CourseName"]]}
						                  onChange={opt => this.requiredChange(opt,course["CourseName"])}/>
											<button className="col-lg-4" style={{float:'right'}} onClick={(e) => {this.addCurriculumAndCourse(curriculum["Name"],course["CourseName"]);}} > Add to Curriculum </button>
										</div>
									</div>
								))}
							</div>
							<div className="col-lg-4">
								<label> Topics </label>
							</div>
							<div className="col-lg-4">
								<label> Goals </label>
							</div>
						</div>
					}
				</div>
			))}
			</div>
		);
	}
}

// Required options
export const requiredOptions = [
	{label: 'Required', value: 1},
	{label: 'Not Required', value: 0},
];
