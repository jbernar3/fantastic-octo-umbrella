import React from "react";
import {connect} from "react-redux";
import MenuBar from "../general_components/MenuBar";
import {changeDisplayCategory, signoutUser, updateCategories} from "../../../actions";
import SideBar from "../general_components/SideBar";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return ( <div className={"main_content"}>
                    profile
                </div>);
    }
}

function mapStateToProps(state) {
    return {
        userID: state.signin.userID,
        firstName: state.signin.firstName,
        lastName: state.signin.lastName,
        numCategories: state.signin.categories.length,
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