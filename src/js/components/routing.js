import {Route, Switch} from 'react-router-dom';
import SignUp from "./SignUp";
import React, {Component} from "react";
import Signin from "./Signin";
import Home from "./Home";
import {connect} from "react-redux";
import SigninContainer from "./SigninContainer";

class Routing extends Component {

    render() {
        const { auth, email, state } = this.props;
        console.log(auth);
        console.log(email);
        console.log(state);
        if (auth) {
            return (<Switch>
                <Route exact path={"/"} component={Home} />
                <Route exact path={"/signup"} component={SignUp} />
                <Route exact path={"/home"} component={Home} />
                <Route exact path={"/signin"} component={SigninContainer} />
                <Route path={"*"} component={() => "404 NOT FOUND"}/>
            </Switch>);
        } else {
            return (<Switch>
                <Route exact path={"/"} component={SigninContainer} />
                <Route exact path={"/signup"} component={SignUp} />
                <Route exact path={"/signin"} component={SigninContainer} />
                <Route path={"*"} component={() => "404 NOT FOUND"}/>
            </Switch>);
        }
    }
}

function mapStateToProps(state) {
    return {
        auth: state.signin.email !== "",
        email: state.signin.email,
        state: state
    }
}

export default connect(mapStateToProps)(Routing);