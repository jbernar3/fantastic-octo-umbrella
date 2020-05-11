import {Route, Switch} from 'react-router-dom';
import SignUp from "./SignUp";
import React, {Component} from "react";
import Signin from "./Signin";
import HomeContainer from "./Home";
import {connect} from "react-redux";
import SigninContainer from "./Signin";
import NotFoundContainer from "./NotFound";

class Routing extends Component {

    render() {
        const { auth } = this.props;
        if (auth) {
            console.log("IN AUTHORIZED ROUTING");
            return (<Switch>
                <Route exact path={"/"} component={HomeContainer} />
                <Route exact path={"/signup"} component={SignUp} />
                <Route exact path={"/home"} component={HomeContainer} />
                <Route exact path={"/signin"} component={Signin} />
                <Route path={"*"} component={NotFoundContainer}/>
            </Switch>);
        } else {
            return (<Switch>
                <Route exact path={"/signup"} component={SignUp} />
                <Route exact path={"/signin"} component={SigninContainer} />
                <Route path={"*"} component={NotFoundContainer}/>
            </Switch>);
        }
    }
}

function mapStateToProps(state) {
    console.log("IN MAP STATE TO PROPS");
    console.log(state.signin.email);
    return {
        auth: state.signin.email !== "",
    }
}

export default connect(mapStateToProps)(Routing);