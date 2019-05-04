import React from 'react';
import ky from 'ky';
import { sessionService } from 'redux-react-session';

export class CreateSection extends React.Component {
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = {
			Semester: '',
			NumStu: '',
      Comment1: '',
			Comment2: '',
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

	async onSubmit (event) {
		event.preventDefault();
		const parsed = await ky.post('http://localhost:8888/CreateSection',{json: {
			Semester: this.state.Semester,
			NumStu: this.state.NumStu,
		  Comment1: this.state.Comment1,
			Comment2: this.state.Comment2,
      APlus: this.state.GAPlus,
			A: this.state.GA,
      AMinus: this.state.GAMinus,
      BPlus: this.state.GBPlus,
			B: this.state.GB,
      BMinus: this.state.GBMinus,
      CPlus: this.state.GCPlus,
			C: this.state.GC,
      CMinus: this.state.GCMinus,
      DPlus: this.state.GDPlus,
			D: this.state.GD,
      DMinus: this.state.GDMinus,
      F: this.state.GF,
			W: this.state.GW,
      I: this.state.GI,
		}}).json();
		console.log(this.state.Semester);
		console.log(this.state.NumStu);
    console.log(this.state.Comment1);
    console.log(this.state.Comment2);
    console.log(parsed);
		//window.location.reload();
	};

	render() {
		return (
			<div>
				<form name="form" onSubmit={this.onSubmit}>
					<div className="input-group form-group">
					<div className="input-group-prepend">
						<span className="input-group-text"><i className="fas fa-user"></i></span>
					</div>
						<input placeholder="FALL16" name="Semester"  className="form-control" checked={this.state.Semester} onChange={this.handleInputChange} required/>
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
			</div>
		);
	}
}
