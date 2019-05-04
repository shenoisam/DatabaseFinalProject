import React from 'react';
import ky from 'ky';

export class CoursePage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			courses: [],
			goals: [],
			topics: []
		};
	}

	async componentDidMount() {
	}

  render() {
		return (
			<div className="container padded">
				<h2>Courses</h2>
				<hr />
				list all courses
			</div>
		);
	}
}
