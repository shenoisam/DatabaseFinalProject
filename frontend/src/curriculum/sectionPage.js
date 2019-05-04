import React from 'react';
import {BarExample} from "./../common/components.js"
import ky from 'ky'

export class SectionsPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			courses: [],
			goals: [],
			topics: [],
			flag:false,
		};
	}

	async componentDidMount() {
		const parsed = await ky.post('http://localhost:8888/GetSectionByCourseNameYearSemester',{json: {
			CourseName: "MyCourse",
			Spring : "Spring", 
			Summer : "Summer",
			Winter: "Winter",
			Fall: "Fall",
			YearUpper: 3000,
			YearLower: 1900

		}}).json();
		console.log("test:", parsed.r2)
		this.state.courses = parsed.r2
		this.state.flag = true;
		this.setState(this.state)
	}

	render() {
		return (
			<div> 
				{this.state.flag && 
				<div className="container padded">
					<h2>Sections</h2>
					<hr />
					<BarExample data = {this.state.courses}/>
				</div>
				}
			</div>
		);
	}
}
