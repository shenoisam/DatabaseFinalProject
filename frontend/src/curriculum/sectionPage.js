import React from 'react';
import {BarExample} from "./../common/components.js"
import * as Bessemer from '../alloy/bessemer/components.js'
import ky from 'ky'

export class SectionsPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			courses: [
				{name: "A+", pv: 0},
				{name: "A", pv: 0},
				{name: "A-", pv: 0},
				{name: "B+", pv: 0},
				{name: "B", pv: 0},
				{name: "B-", pv: 0},
				{name: "C+", pv: 0},
				{name: "C", pv: 0},
				{name: "C-", pv: 0},
				{name: "D+", pv: 0},
				{name: "D", pv: 0},
				{name: "D-", pv: 0},
				{name: "F", pv: 0},
				{name: "W", pv: 0},
				{name: "I", pv: 0},
			],
			goals: [],
			topics: [],
			flag:false,
			CourseName: "a",
			Spring: "a",
			Summer: "a",
			Winter: "a",
			Fall: "a",
			YearUpper: 3000, 
			YearLower: 1900
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
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


	


	async onSubmit(event){
		event.preventDefault();
		
		
		
		const parsed = await ky.post('http://localhost:8888/GetSectionByCourseNameYearSemester',{json: {
			CourseName: this.state.CourseName,
			Spring : this.state.Spring, 
			Summer : this.state.Summer,
			Winter: this.state.Winter,
			Fall: this.state.Fall,
			YearUpper: 3000,
			YearLower: 1900

		}}).json();
		var data = Object.values(parsed.r2[0])
		console.log("The pulled data", data)
		this.state.flag = true
		for (var i = 0; i < data.length;i++){
			this.state.courses[i].pv = data[i]
		}
		console.log(this.state.courses)
	
	
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
						<Bessemer.Select style={{backgroundColor:'black',width:'35%'}} name="Spring"
							className='col-3'
							friendlyName="Spring" placeholder={this.state.Spring}
							options={semesterOptions} value={this.state.Spring}
							onChange={opt => this.semester1Change(opt)}/>
						<Bessemer.Select style={{backgroundColor:'black',width:'35%'}} name="Summer"
							className='col-3'
							friendlyName="Summer" placeholder={this.state.Summer}
							options={semesterOptions1} value={this.state.Summer}
							onChange={opt => this.semester2Change(opt)}/>
						<Bessemer.Select style={{backgroundColor:'black',width:'35%'}} name="Fall"
							className='col-3'
							friendlyName="Fall" placeholder={this.state.Fall}
							options={semesterOptions2} value={this.state.Fall}
							onChange={opt => this.semester3Change(opt)}/>
						<Bessemer.Select style={{backgroundColor:'black',width:'35%'}} name="Winter"
							className='col-3'
							friendlyName="Winter" placeholder={this.state.Winter}
							options={semesterOptions3} value={this.state.Winter}
							onChange={opt => this.semester4Change(opt)}/>
					</div>
					<button className="btn float-right register_btn" style={{border:'1px solid'}}>Does something</button>
				</form>
		        {this.state.flag == true && 
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
	{label: 'YES Spring', value: 'Spring'},
	{label: 'No Spring', value: 'No'},
];
export const semesterOptions1 = [
	{label: 'Yes Summer', value: 'Summer'},
	{label: 'No Summer', value: 'No'},
];
export const semesterOptions2 = [
	{label: 'Yes Fall', value: 'Fall'},
	{label: 'No Fall', value: 'No'},
];
export const semesterOptions3 = [
	{label: 'Yes Winter', value: 'Winter'},
	{label: 'No Winter', value: 'No'},
];