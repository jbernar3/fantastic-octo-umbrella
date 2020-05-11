import React, {Component} from "react";
import {connect} from "react-redux";
import Redirect from "react-router-dom/es/Redirect";

class NotFound extends Component {
    render() {
        if (this.props.isLoggedIn) {
           return(<div>404 Not Found</div>)
        }
        return(<Redirect to={"/signin"}/>)
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.signin.email !== ""
    }
}

const NotFoundContainer = connect(mapStateToProps)(NotFound);

export default NotFoundContainer