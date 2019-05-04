import React from 'react';
import ky from 'ky';

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
			Topics:[],
			Goals:[],
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

	setOtherCurriculumToFalse(name){
		for (var i = 0; i < this.state.curriculums.length; i++) {
			let j = this.state.curriculums[i]
			this.state.ShowingCurr[j.Name] = false;
		}
		this.state.ShowingCurr[name] = true;
		this.setState(this.state);
	}

	async clickedCurriculum(name){
		// Updates all courses,topics,and goals linked to a curriculum
		this.setOtherCurriculumToFalse(name)
		const parsed = await ky.post('http://localhost:8888/GetAllCourses',{json: {
		}}).json();
		console.log(parsed)

	}

	async addCurriculumAndCourse(name,id){
		// Adds a course to a curriculum

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
