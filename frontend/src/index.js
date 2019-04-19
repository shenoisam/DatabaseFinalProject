import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import {NavBar} from './common/navbar.js';
import createLogger from 'redux-logger';
import {Register, Login} from './user/register.js';
import logo from './logo.svg';
import * as Pages from './pages.js';
import Cookies from 'universal-cookie';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import * as Utils from './alloy/utils/core-utils';

const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
    <NavBar/>
    </header>
    <main>
    <Route path="/" exact component={Pages.Home} />
    <Route path="/register" exact component={Pages.RegisterPage} />
    <Route path="/login" component={Pages.LoginPage} />
    <Route path="/create" exact component={Pages.CreateUser} />
    <Route path="/courses" exact component={Pages.Courses} />
    <Route path="/sections" exact component={Pages.Sections} />
    </main>
  </div>
)

const Apd = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
)

ReactDOM.render(<Apd />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
