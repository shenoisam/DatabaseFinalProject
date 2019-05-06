import React from 'react';
import {BarExample} from "./../common/components.js";
import * as Bessemer from '../alloy/bessemer/components.js';
import ky from 'ky';


export class SectionsPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			courses: [
				{name: "A+", pv : 0},
				{name: "A", pv : 0},
				{name: "A-", pv : 0},
				{name: "B+", pv : 0},
				{name: "B", pv : 0},
				{name: "B-", pv : 0},
				{name: "C+", pv : 0},
				{name: "C", pv : 0},
				{name: "C-", pv : 0},
				{name: "D+", pv : 0},
				{name: "D", pv : 0},
				{name: "D-", pv : 0},
				{name: "F", pv : 0},
				{name: "W", pv : 0},
				{name: "I", pv : 0},
			],
			GoalGrade : [
				{name: "A+", pv : 0},
				{name: "A", pv : 0},
				{name: "A-", pv : 0},
				{name: "B+", pv : 0},
				{name: "B", pv : 0},
				{name: "B-", pv : 0},
				{name: "C+", pv : 0},
				{name: "C", pv : 0},
				{name: "C-", pv : 0},
				{name: "D+", pv : 0},
				{name: "D", pv : 0},
				{name: "D-", pv : 0},
				{name: "F", pv : 0},
				{name: "W", pv : 0},
				{name: "I", pv : 0},
			],
			goals: [],
			topics: [],
			flag:true,
			flag2:true,
			CourseName: "",
			Spring: "",
			Summer: "",
			Winter: "",
			Fall: "",
			YearUpper: 3000,
			YearLower: 1900,
            GoalID : "",
			Semester: "Semester",
			Year : "",
			APlus: 0,
			A: 0,
			AMinus: 0,
			BPlus: 0,
			B: 0,
			BMinus: 0,
			CPlus: 0,
			C: 0,
			CMinus: 0,
			DPlus: 0,
			D: 0,
			DMinus: 0,
			F: 0,
			W: 0,
			I: 0,

			
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onSubmit2 = this.onSubmit2.bind(this);
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
			YearUpper: this.state.YearUpper,
			YearLower: this.state.YearLower

		}}).json();
		if(parsed.r2){
			var data = Object.values(parsed.r2[0])
			console.log("The pulled data", data)
			this.state.flag = true
			for (var i = 0; i < data.length;i++){
				this.state.courses[i].pv = data[i]
			}
			console.log(this.state.courses)
			this.setState(this.state);
			this.render();
		}

	}
	async onSubmit2(event){
		event.preventDefault();

		const parsed = await ky.post('http://localhost:8888/CreateSectionGoal',{json: {
			ID         : this.state.GoalID,
			Year       : this.state.Year,
			CourseName : this.state.CourseName,
			Semester   : this.state.Semester,
			APlus: this.state.APlus,
			A: this.state.A,
			AMinus: this.state.AMinus,
			BPlus: this.state.BPlus,
			B: this.state.B,
			BMinus: this.state.BMinus,
			CPlus: this.state.CPlus,
			C: this.state.C,
			CMinus: this.state.CMinus,
			DPlus: this.state.DPlus,
			D: this.state.D,
			DMinus: this.state.DMinus,
			F: this.state.F,
			W: this.state.W,
			I: this.state.I,
		}}).json();
		if(parsed.r2){
			var data = Object.values(parsed.r2[0])
			console.log("The pulled data", data)
			this.state.flag = true
			for (var i = 0; i < data.length;i++){
				this.state.courses[i].pv = data[i]
			}
			console.log(this.state.courses)
			this.setState(this.state);
			this.render();
		}

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
					<div className="row" style = {{marginTop:'2%'}}>
					    <input className='col-3' style={{backgroundColor:'white',width:'49%',marginLeft: '15px'}}placeholder="Lower Year" name="YearLower"  className="form-control" checked={this.state.YearLower} onChange={this.handleInputChange} required/>
						<input className='col-3'style={{backgroundColor:'white',width:'48.5%', paddingLeft: '15px'}} placeholder="Upper Year" name="YearUpper"  className="form-control" checked={this.state.YearUpper} onChange={this.handleInputChange} required/>
					</div>
					
					<button className="btn float-right register_btn" style={{border:'1px solid'}}>Does something</button>
				</form>
				<p>Section Grade Distribution</p>
				{this.state.flag == true &&
					<BarExample data = {this.state.courses}></BarExample>
				}
				<p>Grade the goal distribution of this section</p>
				<form name="form" onSubmit={this.onSubmit}>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-user"></i></span>
					</div>
						<input placeholder="Course Name" name="CourseName"  className="form-control" checked={this.state.CourseName} onChange={this.handleInputChange} required/>
					</div>
					<div className="row">
						<Bessemer.Select className="col-lg-4" name="Semester"
							className='col-3'
							friendlyName="Semester" placeholder={this.state.Semester}
							options={semesterOptions4} value={this.state.Semester}
							onChange={opt => this.semester1Change(opt)}/>
						<div className="col-lg-4">
						     <input placeholder="Year" name="Year"  className="form-control" checked={this.state.Year} onChange={this.handleInputChange} required/> 
						</div>
						<div className="col-lg-4">
						
						     <input placeholder="Goal" name="Year"  className="form-control" checked={this.state.Year} onChange={this.handleInputChange} required/> 
						</div>
						
					</div>
					<button className="btn float-right register_btn" style={{border:'1px solid'}}>Does something</button>
				</form>
				{this.state.flag2 == true &&
					<BarExample data = {this.state.GoalGrade}></BarExample>
				}
			    <br></br>
				<br></br>
				<form  name="form" onSubmit={this.onSubmit2}>
			
				<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-user"></i></span>
					</div>
						<input placeholder="Course Name" name="CourseName"  className="form-control" checked={this.state.CourseName} onChange={this.handleInputChange} required/>
					</div>
					<div className="row">
						<Bessemer.Select className="col-lg-4" name="Semester"
							className='col-3'
							friendlyName="Semester" placeholder={this.state.Semester}
							options={semesterOptions4} value={this.state.Semester}
							onChange={opt => this.semester1Change(opt)}/>
						<div className="col-lg-4">
						     <input placeholder="Year" name="Year"  className="form-control" checked={this.state.Year} onChange={this.handleInputChange} required/> 
						</div>
						<div className="col-lg-4">
						     <input placeholder="Goal ID" name="GoalID"  className="form-control" checked={this.state.GoalID} onChange={this.handleInputChange} required/> 
						</div>
						
					</div>
					<input placeholder="A+" type="number" name="APlus" checked={this.state.APlus} onChange={this.handleInputChange} />
					<input placeholder="A" type="number" name="A" checked={this.state.A} onChange={this.handleInputChange} />
					<input placeholder="A-" type="number" name="AMinus" checked={this.state.AMinus} onChange={this.handleInputChange} />
					<input placeholder="B+" type="number" name="BPlus" checked={this.state.BPlus} onChange={this.handleInputChange} />
					<input placeholder="B" type="number" name="B" checked={this.state.B} onChange={this.handleInputChange} />
					<input placeholder="B-" type="number" name="BMinus" checked={this.state.BMinus} onChange={this.handleInputChange} />
					<input placeholder="C+" type="number" name="CPlus" checked={this.state.CPlus} onChange={this.handleInputChange} />
					<input placeholder="C" type="number" name="C" checked={this.state.C} onChange={this.handleInputChange} />
					<input placeholder="C-" type="number" name="CMinus" checked={this.state.CMinus} onChange={this.handleInputChange} />
					<input placeholder="D+" type="number" name="DPlus" checked={this.state.DPlus} onChange={this.handleInputChange} />
					<input placeholder="D" type="number" name="D" checked={this.state.D} onChange={this.handleInputChange} />
					<input placeholder="D-" type="number" name="DMinus" checked={this.state.DMinus} onChange={this.handleInputChange} />
					<input placeholder="F" type="number" name="F" checked={this.state.F} onChange={this.handleInputChange} />
					<input placeholder="W" type="number" name="W" checked={this.state.W} onChange={this.handleInputChange} />
					<input placeholder="I" type="number" name="I" checked={this.state.I} onChange={this.handleInputChange} />
					<button className="btn float-right register_btn" style={{border:'1px solid'}}>Grade Section</button>
				</form>

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
export const semesterOptions4 = [
	{label: 'Winter', value: 'Winter'},
	{label: 'Spring', value: 'Spring'},
	{label: 'Summer', value: 'Summer'},
	{label: 'Fall', value: 'Fall'}
];