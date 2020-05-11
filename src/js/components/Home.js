import React, {Component} from "react";
import {connect} from "react-redux";
import {signinUser, signoutUser} from "../../actions";

class Home extends Component {
    render() {
        return(
            <div>This is home page, {this.props.firstName}<button onClick={this.props.logOut}>Log Out</button></div>
        )
    }
}

function mapStateToProps(state) {
    return {
        firstName: state.signin.firstName
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: () => {
            dispatch(signoutUser())
        }
    }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer