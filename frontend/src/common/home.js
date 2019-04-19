import React from 'react';
import Favicon from 'react-favicon';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Register, Login} from '../user/register.js';
import {NavBar} from './common/navbar.js';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Router>
            <NavBar>
            </NavBar>
            This is the home page!

        </Router>
        );
        
    }

}