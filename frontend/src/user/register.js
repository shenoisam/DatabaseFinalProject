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

const reducers = {
	session: sessionReducer
};
const reducer = combineReducers(reducers);

const store = createStore(reducer);
sessionService.initSessionService(store);

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      id:'',
			email:'',
			pass:'',
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

		console.log(parsed);
		sessionService.saveSession(parsed);

		loadSession
		.then(currentSession => console.log(currentSession))
		.catch(err => console.log(err))

		this.state.id = parsed;
		this.setState(this.state);
	};

	render() {
		return (
      <div>
        <form name="form" onSubmit={this.onSubmit}>
        <input name="email" checked={this.state.email} onChange={this.handleInputChange} />
        <input name="password" checked={this.state.password} onChange={this.handleInputChange} />
        <input name="fName" checked={this.state.fName} onChange={this.handleInputChange} />
				<input name="lName" checked={this.state.lName} onChange={this.handleInputChange} />
        <button> Submit </button>
        </form >
      </div>
    	);
  }
}

class Login extends React.Component {
	render() {
		return (
     <div>
        <span> Hey Login Page </span>
      </div>
    	);
    }
  }

export { Register,Login };
