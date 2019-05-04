import React from 'react';
<<<<<<< HEAD
import ky from 'ky';
import * as Components from '../common/components.js';
=======
>>>>>>> 4a679f5b21150e230d16797524ba0900c9ec2115

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
				<Components.BarExample />
			</div>
		);
	}
}
