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
			GAPlus: 0,
      GA: 0,
      GAMinus: 0,
      GBPlus: 0,
      GB: 0,
      GBMinus: 0,
      GCPlus: 0,
      GC: 0,
      GCMinus: 0,
      GDPlus: 0,
      GD: 0,
      GDMinus: 0,
      GF: 0,
      GW: 0,
      GI: 0,
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
      GAPlus: this.state.GAPlus,
			GA: this.state.GA,
      GAMinus: this.state.GAMinus,
      GBPlus: this.state.GBPlus,
			GB: this.state.GB,
      GBMinus: this.state.GBMinus,
      GCPlus: this.state.GCPlus,
			GC: this.state.GC,
      GCMinus: this.state.GCMinus,
      GDPlus: this.state.GDPlus,
			GD: this.state.GD,
      GDMinus: this.state.GDMinus,
      GF: this.state.GF,
			GW: this.state.GW,
      GI: this.state.GI,
		}}).json();
		console.log(this.state.Semester);
		console.log(this.state.NumStu);
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
					<input placeholder="A+" type="number" name="GAPlus" checked={this.state.GAPlus} onChange={this.handleInputChange} required/>
          <input placeholder="A" type="number" name="GA" checked={this.state.GA} onChange={this.handleInputChange} required/>
          <input placeholder="A-" type="number" name="GAMinus" checked={this.state.GAMinus} onChange={this.handleInputChange} required/>
          <input placeholder="B+" type="number" name="GBPlus" checked={this.state.GBPlus} onChange={this.handleInputChange} required/>
          <input placeholder="B" type="number" name="GB" checked={this.state.GB} onChange={this.handleInputChange} required/>
          <input placeholder="B-" type="number" name="GBMinus" checked={this.state.GBMinus} onChange={this.handleInputChange} required/>
          <input placeholder="C+" type="number" name="GCPlus" checked={this.state.GCPlus} onChange={this.handleInputChange} required/>
          <input placeholder="C" type="number" name="GC" checked={this.state.GC} onChange={this.handleInputChange} required/>
          <input placeholder="C-" type="number" name="GCMinus" checked={this.state.GCMinus} onChange={this.handleInputChange} required/>
          <input placeholder="D+" type="number" name="GDPlus" checked={this.state.GDPlus} onChange={this.handleInputChange} required/>
          <input placeholder="D" type="number" name="GD" checked={this.state.GD} onChange={this.handleInputChange} required/>
          <input placeholder="D-" type="number" name="GDMinus" checked={this.state.GDMinus} onChange={this.handleInputChange} required/>
          <input placeholder="F" type="number" name="GF" checked={this.state.GF} onChange={this.handleInputChange} required/>
          <input placeholder="W" type="number" name="GW" checked={this.state.GW} onChange={this.handleInputChange} required/>
          <input placeholder="I" type="number" name="GI" checked={this.state.GI} onChange={this.handleInputChange} required/>
					<button className="btn float-right register_btn" style={{border:'1px solid'}}>Create Section</button>
				</form>
			</div>
		);
	}
}
