import React from 'react';
import ky from 'ky';
import * as Bessemer from '../alloy/bessemer/components.js'
import { sessionService } from 'redux-react-session';

export class CreateSection extends React.Component {
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = {
      Year: '2019',
			Semester: 'Fall',
			NumStu: '',
      Comment1: '',
			Comment2: '',
      CourseName: '',
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
      error:'',
      errorCourse:'',
		};
	}

	async componentDidMount() {
		sessionService.loadSession().then(curr => {
			console.log("UserID: ", curr)
		}).catch(err =>
			console.log(err)
		);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

  semesterChange(e){
		if (e != null) {
      this.setState({
        Semester: e
      });
		}
	};

  yearChange(e){
		if (e != null) {
      this.setState({
        Year: e
      });
		}
	};

	async onSubmit (event) {
		event.preventDefault();
		const parsed = await ky.post('http://localhost:8888/CreateSection',{json: {
      Year: this.state.Year,
			Semester: this.state.Semester,
			NumStu: this.state.NumStu,
		  Comment1: this.state.Comment1,
			Comment2: this.state.Comment2,
      CourseName: this.state.CourseName,
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
		}}).json().catch(err => {
      console.log(err)
    });

    console.log(parsed)
		console.log(this.state)

    if(parsed.r2){
      this.setState({
	      error: '',
        errorCourse: ''
	    });
		}
		else {
      this.setState({
	      error: 'Incorrect Data. Try Again!',
        errorCourse: this.state.CourseName
	    });
		}
    this.render();
	};

	render() {
		return (
			<div>
				<form name="form" onSubmit={this.onSubmit}>
					<div className="input-group form-group">
  					<div className="input-group-prepend">
  						<span className="input-group-text"><i className="fas fa-user"></i></span>
  					</div>
            <Bessemer.Select style={{backgroundColor:'black',width:'35%'}} name="Semester"
            			className='col-6'
                   friendlyName="Semester" placeholder={this.state.Semester}
                   options={semesterOptions} value={this.state.Semester}
                   onChange={opt => this.semesterChange(opt)}/>
            <Bessemer.Select className="form-control" style={{backgroundColor:'black',width:'35%'}} name="Year"
            			className='col-5'
                  friendlyName="Year" placeholder={this.state.Year}
                  options={yearOptions} value={this.state.Year}
                  onChange={opt => this.yearChange(opt)}/>
					</div>
          <div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-key"></i></span>
					</div>
						<input placeholder ="Course Name for Section" name="CourseName"  className="form-control" checked={this.state.CourseName} onChange={this.handleInputChange} required/>
					</div>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-key"></i></span>
					</div>
						<input placeholder ="# of Students" name="NumStu"  className="form-control" checked={this.state.NumStu} onChange={this.handleInputChange} required/>
					</div>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-key"></i></span>
					</div>
						<input placeholder ="Comment 1" name="Comment1"  className="form-control" checked={this.state.Comment1} onChange={this.handleInputChange} required/>
					</div>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-key"></i></span>
					</div>
						<input placeholder ="Comment 2" name="Comment2"  className="form-control" checked={this.state.Comment2} onChange={this.handleInputChange} required/>
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
					<button className="btn float-right register_btn" style={{border:'1px solid'}}>Create Section</button>
				</form>
        {this.state.error && <p> Error for {this.state.errorCourse}, make sure count is correct and course exists </p>}
			</div>
		);
	}
}
// Semester options
export const semesterOptions = [
	{label: 'Spring', value: 'Spring'},
	{label: 'Summer', value: 'Summer'},
	{label: 'Fall', value: 'Fall'},
  {label: 'Winter', value: 'Winter'}
];
// Years options
export const yearOptions = [
	{label: '2019', value: '2019'},
	{label: '2020', value: '2020'},
	{label: '2021', value: '2021'},
  {label: '2022', value: '2022'}
];
