import React from 'react';
import {CreateCurriculum} from './curriculum/createCurriculum.js'
import {CoursePage} from './curriculum/coursePage.js'
import {SectionsPage} from './curriculum/sectionPage.js'
import {CurriculumPagee} from './curriculum/curriculumPage.js'
import {Register, Login} from './user/register.js'

export class RegisterPage extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div className="row">
					<div className="col-12">
						<h2>Register</h2>
						<hr />
            <Register/>
					</div>
				</div>
			</div>
		);
	}
}

export class LoginPage extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div className="row">
					<div className="col-12">
						<h2>Login</h2>
						<hr />
            <Login/>
					</div>
				</div>
			</div>
		);
	}
}

export class Home extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div className="row">
					<div className="col-12">
						<h2>Create Curriculum </h2>
						<hr />
            <CreateCurriculum/>
						<br/>
						<br/>
						<h2> All Curriculums </h2>
						<hr />
						<CurriculumPagee/>
					</div>
				</div>
			</div>
		);
	}
}

export class CurriculumPage extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div className="row">
					<div className="col-12">
						<h2> All Curriculums </h2>
						<hr />
						<CurriculumPagee/>
					</div>
				</div>
			</div>
		);
	}
}


export class Courses extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div className="row">
					<div className="col-12">
						<CoursePage/>
					</div>
				</div>
			</div>
		);
	}
}

export class Sections extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div className="row">
					<div className="col-12">
						<SectionsPage/>
					</div>
				</div>
			</div>
		);
	}
}

export class SectionPage extends React.Component {
	render() {
		return (
			<div>
			</div>
		);
	}
}

export class SpecificSectionPage extends React.Component {
	render() {
		return (
			<div>
			</div>
		);
	}
}

export class ListCurriculum extends React.Component {
	render() {
		return (
			<div>
			</div>
		);
	}
}

export class ListTopics extends React.Component {
	render() {
		return (
			<div>
			</div>
		);
	}
}

export class ListCourses extends React.Component {
	render() {
		return (
			<div>
			</div>
		);
	}
}

export class EditTopics extends React.Component {
	render() {
		return (
			<div>
				edit topics
			</div>
		);
	}
}

export class EditCourse extends React.Component {
	render() {
		return (
			<div>
			</div>
		);
	}
}

export class EditCurriculum extends React.Component {
	render() {
		return (
			<div>
			</div>
		);
	}
}

export class EditGoals extends React.Component {
	render() {
		return (
			<div>
			</div>
		);
	}
}

export class ListComments extends React.Component {
	render() {
		return (
			<div>
			</div>
		);
	}
}
