import React from 'react';
import {Button} from 'reactstrap';

export class CurriculumPagee extends React.Component {
	async componentDidMount() {

		/*const parsed = await ky.post('http://localhost:8888/GetCourses',{json: {
			//Email:this.state.email,
			//Password:this.state.password,
			//FirstName:this.state.fName,
			//LastName:this.state.lName,
		}}).json(); */
	}

	render() {
		return (
			<div className="container-padded">
				<div className="row">
					<div className="col-4">
						<div className="card CurriculumCard">
							courses
						</div>
						<div>
							<Button color="secondary">Courses</Button>
						</div>
					</div>
					<div className="col-4">
						<div className="card CurriculumCard">
							topics
						</div>
						<div>
							<Button color="secondary">Topics</Button>
						</div>
					</div>
					<div className="col-4">
						<div className="card CurriculumCard">
							goals
						</div>
						<div>
							<Button color="secondary">Goals</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
