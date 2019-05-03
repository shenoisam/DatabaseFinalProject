import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import {NavBar} from './common/navbar.js';
import * as Pages from './pages.js';

const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
    <NavBar/>
    </header>
    <main>
    <Route path="/" exact component={Pages.Home} />
    <Route path="/register" exact component={Pages.RegisterPage} />
    <Route path="/login" component={Pages.LoginPage} />
    <Route path="/courses" exact component={Pages.Courses} />
    <Route path="/sections" exact component={Pages.Sections} />
    <Route path="/curriculum" exact component={Pages.CurriculumPage} />
    <Route path="/specific-section" exact component={Pages.SpecificSectionPage} />
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
