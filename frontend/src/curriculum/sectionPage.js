import React from 'react';
import {BarExample} from "./../common/components.js"
import * as Bessemer from '../alloy/bessemer/components.js'
import ky from 'ky'

export class SectionsPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			courses: [],
			goals: [],
			topics: [],
			flag:false,
			CourseName: "",
			Spring: "",
			Summer: "",
			Winter: "",
			Fall: "",
			YearUpper: 3000, 
			YearLower: 1900
		};
	}

	async componentDidMount() {
		const parsed = await ky.post('http://localhost:8888/GetSectionByCourseNameYearSemester',{json: {
			CourseName: this.state.CourseName,
			Spring : this.state.Spring, 
			Summer : this.state.Summer,
			Winter: this.state.Winter,
			Fall: this.state.Fall,
			YearUpper: 3000,
			YearLower: 1900

		}}).json();
		console.log("test:", parsed.r2)
		this.state.courses = parsed.r2
		this.state.flag = true;
		this.setState(this.state)
	}

	semester1Change(e){
		if (e != null) {
      this.setState({
        Spring: e
      });
		}
	};
	semester2Change(e){
		if (e != null) {
      this.setState({
        Summer: e
      });
		}
	};
	semester3Change(e){
		if (e != null) {
      this.setState({
        Fall: e
      });
		}
	};
	semester4Change(e){
		if (e != null) {
      this.setState({
        Winter: e
      });
		}
	};


	handleInputChange(event) {
		
	}

	async onSubmit(){
		this.state.Spring = semesterOptions;
		this.state.Summer = semesterOptions1;
		this.state.Fall = semesterOptions2;
		this.state.Winter = semesterOptions3;
		const parsed = await ky.post('http://localhost:8888/GetSectionByCourseNameYearSemester',{json: {
			CourseName: this.state.CourseName,
			Spring : this.state.Spring, 
			Summer : this.state.Summer,
			Winter: this.state.Winter,
			Fall: this.state.Fall,
			YearUpper: 3000,
			YearLower: 1900

		}}).json();
		this.state.courses = parsed
		this.state.rendered = true


	}

	render() {
		return (
			<div> 
				<form name="form" onSubmit={this.onSubmit}>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-user"></i></span>
					</div>
						<input placeholder="Course Name" name="CourseName"  className="form-control" checked={this.state.CourseName} onChange={this.handleInputChange} required/>
					</div>
					<div className="row">
						<Bessemer.Select style={{backgroundColor:'black',width:'35%'}} name="Semester"
							className='col-3'
							friendlyName="Semester" placeholder={this.state.Spring}
							options={semesterOptions} value={this.state.Spring}
							onChange={opt => this.semester1Change(opt)}/>
						<Bessemer.Select style={{backgroundColor:'black',width:'35%'}} name="Semester"
							className='col-3'
							friendlyName="Semester" placeholder={this.state.Summer}
							options={semesterOptions1} value={this.state.Summer}
							onChange={opt => this.semester2Change(opt)}/>
						<Bessemer.Select style={{backgroundColor:'black',width:'35%'}} name="Semester"
							className='col-3'
							friendlyName="Semester" placeholder={this.state.Fall}
							options={semesterOptions2} value={this.state.Fall}
							onChange={opt => this.semester3Change(opt)}/>
						<Bessemer.Select style={{backgroundColor:'black',width:'35%'}} name="Semester"
							className='col-3'
							friendlyName="Semester" placeholder={this.state.Winter}
							options={semesterOptions3} value={this.state.Winter}
							onChange={opt => this.semester4Change(opt)}/>
					</div>
					<button className="btn float-right register_btn" style={{border:'1px solid'}}>Does something</button>
				</form>
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

// Semester options
export const semesterOptions = [
	{label: 'Yes', value: 'Spring'},
	{label: 'No', value: 'No'},
];
export const semesterOptions1 = [
	{label: 'Yes', value: 'Summer'},
	{label: 'No', value: 'No'},
];
export const semesterOptions2 = [
	{label: 'Yes', value: 'Fall'},
	{label: 'No', value: 'No'},
];
export const semesterOptions3 = [
	{label: 'Yes', value: 'Winter'},
	{label: 'No', value: 'No'},
];