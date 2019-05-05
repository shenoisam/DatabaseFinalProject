import React from 'react';
import ky from 'ky';
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
			MyTopics:[],
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
		this.state.MyCourses = []
		this.state.Courses = []
		this.setState(this.state)

		const parsed3 = await ky.post('http://localhost:8888/GetTopicsInCurriculum',{json: {
			Name: name
		}}).json();
		const parsed4 = await ky.post('http://localhost:8888/GetTopicsNotInCurriculum',{json: {
			Name: name
		}}).json();
		this.state.MyTopics = []
		this.state.Courses = []
		this.setState(this.state)

		if(parsed1.r2){
			for (let i = 0; i < parsed1.r2.length; i++) {
				this.state.MyCourses[i] = parsed1.r2[i]
			}
		}

		if(parsed2.r2){
			for (let i = 0; i < parsed2.r2.length; i++) {
				this.state.Courses[i] = parsed2.r2[i]
				console.log(this.state.Courses[i]);
			}
		}
		if(parsed3.r2){
			for (let i = 0; i < parsed3.r2.length; i++) {
				this.state.MyTopics[i] = parsed3.r2[i]
			}
		}

		if(parsed4.r2){
			for (let i = 0; i < parsed4.r2.length; i++) {
				this.state.Topics[i] = parsed4.r2[i]
		
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

	async addCurriculumAndTopic(nameCur,topic){
		// Adds a course to a curriculum
		const parsed = await ky.post('http://localhost:8888/CreateCurriculumTopics',{json: {
			Name:nameCur,
			ID:topic,

		}}).json();
		this.updateComp(nameCur)
	}
	async RemoveTopicFromCurriculum(nameCur,topic){
		// Adds a course to a curriculum

		const parsed = await ky.post('http://localhost:8888/RemoveTopicromCurriculum',{json: {
			Name:nameCur,
			ID:topic,
		}}).json();
		console.log(parsed)
		this.updateComp(nameCur)
	}
	async addCurriculumAndCourse(nameCur,nameCourse){
		// Adds a course to a curriculum
		const parsed = await ky.post('http://localhost:8888/CreateCurCourse',{json: {
			Curriculum:nameCur,
			CourseName:nameCourse,
			Required:this.state.Required[nameCourse]
		}}).json();
		this.updateComp(nameCur)
	}
	async RemoveCourseFromCurriculum(nameCur,nameCourse){
		// Adds a course to a curriculum
		console.log(this.state.Required[nameCourse]);
		const parsed = await ky.post('http://localhost:8888/RemoveCourseFromCurriculum',{json: {
			Curriculum:nameCur,
			CourseName:nameCourse,
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
												<p className="col-lg-12" style={{paddingLeft:'0px', paddingRight:'0px'}}> Name: {course["CourseName"]}	</p>
												<button className="col-lg-12" style={{float:'right',background:"#ff0000"}} onClick={(e) => {this.RemoveCourseFromCurriculum(curriculum["Name"],course["CourseName"]);}} > Remove from Curriculum </button>
											</div>
										</div>
									))}
								{this.state.Courses.map(course => (
									<div key={course["CourseName"]} className="col-lg-12" style={{border:'1px solid',marginBottom:'20px'}}>
										<div className="row">
											<p className="col-lg-8" style={{paddingLeft:'0px', paddingRight:'0px'}} > Name: {course["CourseName"]}	</p>
											<span className="col-4" style={{paddingLeft:'0px', paddingRight:'0px'}} >
												<Bessemer.Select name="Required" friendlyName="Required" placeholder={this.state.Required[course["CourseName"]]}
						                  options={requiredOptions} value={this.state.Required[course["CourseName"]]}
						                  onChange={opt => this.requiredChange(opt,course["CourseName"])}/>
											</span>
											<button className="col-lg-12" style={{float:'right'}} onClick={(e) => {this.addCurriculumAndCourse(curriculum["Name"],course["CourseName"]);}} > Add to Curriculum </button>
										</div>
									</div>
								))}
							</div>

							
							<div className="col-lg-4">
								<label> Topics </label>
								{this.state.MyTopics.map(topic => (
										<div key={topic["ID"]} className="col-lg-12" style={{border:'1px solid',marginBottom:'5px'}}>
											<div className="row">
											<p className="col-lg-8" style={{paddingLeft:'0px', paddingRight:'0px'}} > Name: {topic["Name"]}	</p>
											<p className="col-lg-8" style={{paddingLeft:'0px', paddingRight:'0px'}} > ID: {topic["ID"]}	</p>
												<button className="col-lg-12" style={{float:'right',background:"#ff0000"}} onClick={(e) => {this.RemoveTopicFromCurriculum(curriculum["Name"],topic["ID"]);}} > Remove from Curriculum </button>
											</div>
										</div>
									))}
								{this.state.Topics.map(topic => (
									<div key={topic["ID"]} className="col-lg-12" style={{border:'1px solid',marginBottom:'20px'}}>
										<div className="row">
											<p className="col-lg-8" style={{paddingLeft:'0px', paddingRight:'0px'}} > Name: {topic["Name"]}	</p>
											<p className="col-lg-8" style={{paddingLeft:'0px', paddingRight:'0px'}} > ID: {topic["ID"]}	</p>
											<button className="col-lg-12" style={{float:'right'}} onClick={(e) => {this.addCurriculumAndTopic(curriculum["Name"],topic["ID"]);}} > Add to Curriculum </button>
										</div>
									</div>
								))}
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
