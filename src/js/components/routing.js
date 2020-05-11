import {Route, Switch} from 'react-router-dom';
import SignUp from "./SignUp";
import React, {Component} from "react";
import Signin from "./Signin";
import HomeContainer from "./Home";
import {connect} from "react-redux";
import SigninContainer from "./Signin";

class Routing extends Component {

    render() {
        const { auth } = this.props;
        if (auth) {
            return (<Switch>
                <Route exact path={"/"} component={HomeContainer} />
                <Route exact path={"/signup"} component={SignUp} />
                <Route exact path={"/home"} component={HomeContainer} />
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
    }
}

export default connect(mapStateToProps)(Routing);