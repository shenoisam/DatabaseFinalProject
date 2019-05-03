import React from 'react';
import Favicon from 'react-favicon';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as Bessemer from '../alloy/bessemer/components';
import * as Validation from '../alloy/utils/validation';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';
import ky from 'ky';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import { sessionService } from 'redux-react-session';
import {Redirect} from 'react-router-dom';

const reducers = {
	session: sessionReducer
};
const reducer = combineReducers(reducers);

const store = createStore(reducer);
sessionService.initSessionService(store, { driver: 'COOKIES' });

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      id:'',
			email:'',
			password:'',
			fName:'',
			lName:''
    }
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

    this.setState({
      [name]: value
    });
  }

  // When the form is being submitted
	async onSubmit (event) {
		event.preventDefault();

		const parsed = await ky.post('http://localhost:8888/CreateUser',{json: {
			Email:this.state.email,
			Password:this.state.password,
			FirstName:this.state.fName,
			LastName:this.state.lName,
		}}).json();

		if(!parsed.err){
			sessionService.saveSession(parsed);
			this.state.id = parsed;
			this.setState(this.state);
		}
	};

	render() {
		if(this.state.id)
			return <Redirect to='/'/>;

		return (
      <div>
				<form name="form" onSubmit={this.onSubmit}>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-user"></i></span>
						</div>
						<input name="email" checked={this.state.email} onChange={this.handleInputChange} className="form-control" placeholder="Email"/>
					</div>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-key"></i></span>
						</div>
						<input name="password" type="password" checked={this.state.password} onChange={this.handleInputChange} className="form-control" placeholder="Password"/>
					</div>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-key"></i></span>
						</div>
						<input name="fName" checked={this.state.fName} onChange={this.handleInputChange} className="form-control" placeholder="FirstName"/>
					</div>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-key"></i></span>
						</div>
						<input name="lName" checked={this.state.lName} onChange={this.handleInputChange} className="form-control" placeholder="LastName"/>
					</div>
					<button className="btn float-right register_btn" style={{border:'1px solid'}}>Register</button>
				</form>
      </div>
    	);
  }
}

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      id:'',
			email:'',
			password:'',
    }
	}

	componentDidMount(){
		sessionService.loadSession().then(curr => {
			this.state.id = curr;
			this.setState(this.state);
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

  // When the form is being submitted
	async onSubmit (event) {
		event.preventDefault();
		const parsed = await ky.post('http://localhost:8888/LoginUser',{json: {
			Email:this.state.email,
			Password:this.state.password,
		}}).json();

		console.log(parsed.r2[0]);
		console.log(this.state.password);
		console.log(this.state.email);

		if(parsed.r2[0]){
			sessionService.saveSession(parsed.r2[0].ID);
			this.state.id = parsed;
			this.setState(this.state);
		}
	};

	render() {
		if(this.state.id)
			return <Redirect to='/'/>;

		return (
			<div>
				<form name="form" onSubmit={this.onSubmit}>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-user"></i></span>
						</div>
						<input name="email" checked={this.state.email} onChange={this.handleInputChange} className="form-control" placeholder="Email"/>
					</div>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-key"></i></span>
						</div>
						<input name="password" type="password" checked={this.state.password} onChange={this.handleInputChange} className="form-control" placeholder="Password"/>
					</div>
					<button className="btn float-right login_btn" style={{border:'1px solid'}}>Login</button>
				</form>
			</div>
			);
		}
	}

export { Register,Login };
