import React from 'react';
import ky from 'ky';

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
		// gets all courses
		const parsed = await ky.post('http://localhost:8888/GetAllCurriculums',{json: {
		}}).json();

		// get all goals
		const parsed1 = await ky.post('http://localhost:8888/GetAllCurriculums',{json: {
		}}).json();

		//get all topics
		const parsed2 = await ky.post('http://localhost:8888/GetAllCurriculums',{json: {
		}}).json();

		this.state.courses = parsed;
		this.state.goals = parsed1;
		this.state.topics = parsed2;

		console.log(parsed);
		console.log(parsed1);
		console.log(parsed2);
	}

	render() {
		return (
			<div className="container padded">
				<h2>Sections</h2>
				<hr />
			</div>
		);
	}
}
