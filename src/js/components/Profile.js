import React from "react";
import {connect} from "react-redux";
import MenuBar from "./MenuBar";
import {changeDisplayCategory, signoutUser, updateCategories} from "../../actions";

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( <div className={"main_content"}>
                    <MenuBar userName={this.props.firstName} logOut={this.props.logOut} />
                    <div>Profile of {this.props.firstName} {this.props.lastName}. Who has {this.props.categories.length} root categories.</div>
                </div>);
    }
}

function mapStateToProps(state) {
    return {
        userID: state.signin.userID,
        firstName: state.signin.firstName,
        lastName: state.signin.lastName,
        categories: state.signin.categories,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: () => {
            dispatch(signoutUser())
        }
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer