import React from "react";
import {connect} from "react-redux";
import MenuBar from "../general_components/MenuBar";
import {changeDisplayCategory, signoutUser, updateCategories} from "../../../actions";
import SideBar from "../general_components/SideBar";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideDrawerOpen: false
        };
        this.toggleDrawerOpen = this.toggleDrawerOpen.bind(this);
    }

    toggleDrawerOpen() {
        this.setState({sideDrawerOpen: !this.state.sideDrawerOpen});
    }

    render() {
        return ( <div className={"main_content"}>
                    <MenuBar userName={this.props.firstName} logOut={this.props.logOut} componentIn={"profile"} toggleDrawerOpen={this.toggleDrawerOpen}/>
                    <SideBar toggleDrawerOpen={this.toggleDrawerOpen} drawerOpen={this.state.sideDrawerOpen} logOut={this.props.logOut} categories={this.props.categories} />
                    <div style={{color: '#ffffff'}}>Profile of {this.props.firstName} {this.props.lastName}. Who has {this.props.categories.length} root categories.</div>
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