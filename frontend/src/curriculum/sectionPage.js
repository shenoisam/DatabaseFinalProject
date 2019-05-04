import React from 'react';
import {BarExample} from "./../common/components.js"
import ky from 'ky'

export class SectionsPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			courses: [],
			goals: [],
			topics: []
		};
	}

	async componentDidMount() {
		const parsed = await ky.post('http://localhost:8888/GetSectionByCourseNameYearSemester',{json: {
			CourseName: "Test",
			Spring : "Spring", 
			Summer : "Summer",
			Winter: "Winter",
			Fall: "Fall",
			YearUpper: 3000,
			YearLower: 1900

		}}).json();
		console.log("test:", parsed)
		this.state.courses = parsed.r2
	}

	render() {
		return (
			<div className="container padded">
				<h2>Sections</h2>
				<hr />
				<BarExample data = {this.state.courses}/>
			</div>
		);
	}
}
