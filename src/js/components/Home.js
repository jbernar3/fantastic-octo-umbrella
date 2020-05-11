import React, {Component} from "react";
import {connect} from "react-redux";

class Home extends Component {
    render() {
        return(
            <div>This is home page, {this.props.firstName}</div>
        )
    }
}

function mapStateToProps(state) {
    return {
        firstName: state.signin.firstName
    }
}

const HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer