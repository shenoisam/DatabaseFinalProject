import React from 'react';
import Favicon from 'react-favicon';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as Bessemer from '../alloy/bessemer/components';
import * as Validation from '../alloy/utils/validation';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';
import ky from 'ky';

class Register extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      email:'d',
      pass:'asd',
      fName:'a',
      lName:'d',
    }
	}

  // When the form is being submitted
	async onSubmit (form) {
    console.log('Submitted a form');

    const parsed = await ky.post('https://localhost:8888/CreateUser', {json: {
      Email:this.state.email,
      Password:this.state.pass,
      FirstName:this.state.fName,
      LastName:this.state.lName,
    }
  })

    console.log('Submitted a form');
	};


	render() {
    let { handleSubmit, submitting } = this.props;

		return (
      <div>
        <form name="form" onSubmit={this.onSubmit}>
        <input name='Email'  />
        <input name='Password'   />
        <input name='FirstName'  />
				<input name='LastName'  />
        <button type="submit" > Submit </button>
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
