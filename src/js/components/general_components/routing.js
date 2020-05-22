import {Route, Switch} from 'react-router-dom';
import SignUp from "../page_components/SignUp";
import React, {Component} from "react";
import HomeContainer from "../page_components/Home";
import {connect} from "react-redux";
import SigninContainer from "../page_components/Signin";
import NotFoundContainer from "./NotFound";
import ProfileContainer from "../page_components/Profile";

class Routing extends Component {
    render() {
        const { auth } = this.props;
        if (auth) {
            return (<Switch>
                <Route exact path={"/"} component={HomeContainer} />
                <Route exact path={"/signup"} component={SignUp} />
                <Route exact path={"/home"} component={HomeContainer} />
                <Route exact path={"/signin"} component={SigninContainer} />
                <Route exact path={"/profile"} component={ProfileContainer} />
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