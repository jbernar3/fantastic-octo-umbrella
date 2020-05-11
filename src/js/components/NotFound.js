import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class NotFound extends Component {
    render() {
        if (this.props.isLoggedIn) {
           return(<div>404 Not Found</div>)
        } else {
            console.log("ABOUT TO REDIRECT TO SIGNIN2");
            return(<Redirect to={"/signin"}/>)
        }
    }
}

function mapStateToProps(state) {
    console.log("ABOUT TO REDIRECT TO SIGNIN");
    console.log(state);
    return {
        isLoggedIn: state.signin.email !== ""
    }
}

const NotFoundContainer = connect(mapStateToProps)(NotFound);

export default NotFoundContainer