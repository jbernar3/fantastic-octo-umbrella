import SignUp from "./js/components/SignUp";
import React from "react";
import {render} from "react-dom";
import {HashRouter as Router} from 'react-router-dom';
import Routes from "./js/components/routing";

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Routes/>
            </Router>
        )
    }
    constructor(props){
        super(props);
        this.state = {
            isSignedIn: false,
        }
    }
}

render(<App />, window.document.getElementById('container'));