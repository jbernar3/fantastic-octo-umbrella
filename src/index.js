import SignUp from "./js/components/SignUp";
import React from "react";
import {render} from "react-dom";
import {HashRouter as Router} from 'react-router-dom';
import Routing from "./js/components/routing";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import armaReducers from "./js/reducers";
import { signinUser} from "./actions";

const store = createStore(armaReducers);

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Routing/>
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

//
// // Log the initial state
// console.log(store.getState());
//
// // Every time the state changes, log it
// // Note that subscribe() returns a function for unregistering the listener
// const unsubscribe = store.subscribe(() => console.log(store.getState()));
//
// // Dispatch some actions
// store.dispatch(signinUser("jeff_bernard", "jeff", "bern"));
//
//
// // Stop listening to state updates
// unsubscribe();
console.log(store.getState());
render(
    <Provider store={store}>
        <App />
    </Provider>, window.document.getElementById('container'));