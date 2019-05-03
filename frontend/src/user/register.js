import React from 'react';
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
			firstName:'',
			lastName:''
    }
	}

	componentDidMount(){
		sessionService.loadSession().then(curr => {
			this.setState({
	      id: curr
	    });
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
		const parsed = await ky.post('http://localhost:8888/CreateUser',{json: {
			Email:this.state.email,
			Password:this.state.password,
			FirstName:this.state.firstName,
			LastName:this.state.lastName,
		}}).json();

		if(!parsed.err){
			sessionService.saveSession(parsed.id);
			this.state.id = parsed;
			this.setState(this.state);
			window.location.reload();
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
						<input name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,14}$" checked={this.state.email} onChange={this.handleInputChange} className="form-control" placeholder="Email" required/>
					</div>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-key"></i></span>
						</div>
						<input name="password" type="password" pattern=".{6,64}" checked={this.state.password} onChange={this.handleInputChange} className="form-control" placeholder="Password" required/>
					</div>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas"></i></span>
						</div>
						<input name="firstName" pattern="[^()\{\}/><\][\\\x22,;|]+" title="Please enter in valid characters." checked={this.state.firstName} onChange={this.handleInputChange} className="form-control" placeholder="firstName" required/>
					</div>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas"></i></span>
						</div>
						<input name="lastName" pattern="[^()\{\}/><\][\\\x22,;|]+" title="Please enter in valid characters." checked={this.state.lastName} onChange={this.handleInputChange} className="form-control" placeholder="lastName" required/>
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
			this.setState({
	      id: curr
	    });
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

		if(parsed.r2[0]){
			sessionService.saveSession(parsed.r2[0].ID);
			this.setState({
	      id: parsed
	    });
			window.location.reload();
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
						<input name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,14}$" checked={this.state.email} onChange={this.handleInputChange} className="form-control" placeholder="Email" required/>
					</div>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-key"></i></span>
						</div>
						<input name="password" type="password" checked={this.state.password} onChange={this.handleInputChange} className="form-control" placeholder="Password" required/>
					</div>
					<button className="btn float-right login_btn" style={{border:'1px solid'}}>Login</button>
				</form>
			</div>
			);
		}
	}

export { Register,Login };
