import React from 'react';
import Favicon from 'react-favicon';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import { sessionService } from 'redux-react-session';
import ky from 'ky';

const reducers = {
	session: sessionReducer
};
const reducer = combineReducers(reducers);
const store = createStore(reducer);
sessionService.initSessionService(store, { driver: 'COOKIES' });

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      id:'',
			fName:'',
			lName:'',
    }
	}

	async componentDidMount(){
		sessionService.loadSession().then(async curr => {
			this.state.id = curr;
			this.setState(this.state);
			const parsed = await ky.post('http://localhost:8888/GetUserById',{json: {
				ID:this.state.id,
			}}).json();
			this.state.fName = parsed.r2[0].FirstName;
			this.state.lName = parsed.r2[0].LastName;
			this.setState(this.state);
		}).catch(err =>
			console.log(err)
		);
	}

	LogoutClick = () => {
		sessionService.deleteSession(this.state.id).then( par =>
			console.log(par)
		).catch(err =>
			console.log(err)
		);
		this.setState({
      id: ''
    });
		this.setState(this.state);
		window.location.reload();
		return ;
	};

	render() {
		if(this.state.id){
			return (
				<div>
					<Favicon url="https://img.icons8.com/ios/50/000000/bear-footprint-filled.png" />
					<nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
						<a className="navbar-brand" href="/">Database Final</a>
						<button className="navbar-toggler" type="button" data-toggle="collapse"
								data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
								aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>

						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item active">
									<a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/curriculum">Curriculum</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/courses">Courses</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/sections">Sections</a>
								</li>
							</ul>

							<ul className="navbar-nav" style={{float:'right'}}>
								<li className="nav-item">
									<a className="nav-link" >Welcome, {this.state.fName} {this.state.lName} </a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/" onClick={this.LogoutClick} > Log Out</a>
								</li>

							</ul>
						</div>
					</nav>
	  			</div>
			);
		}
		else{
			return (
				<div>
					<nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
						<a className="navbar-brand" href="/">Database Final</a>
						<button className="navbar-toggler" type="button" data-toggle="collapse"
								data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
								aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>

						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item active">
									<a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/curriculum">Curriculum</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/courses">Courses</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/sections">Sections</a>
								</li>
							</ul>

							<ul className="navbar-nav" style={{float:'right'}}>

								{/* if theyre logged in lets display their username */}
								<li className="nav-item">
									<a className="nav-link" href="/register">Register</a>
								</li>

								<li className="nav-item">
									<a className="nav-link" href="/login">Login</a>
								</li>
							</ul>
						</div>
					</nav>
	  			</div>
			);
		}
	}
}

export { NavBar };
