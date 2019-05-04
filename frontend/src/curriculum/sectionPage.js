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
