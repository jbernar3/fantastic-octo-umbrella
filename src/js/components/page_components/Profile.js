import React from "react";
import {connect} from "react-redux";
import MenuBar from "../general_components/MenuBar";
import {
    changeDisplayCategory,
    editProfile,
    signoutUser,
    updateCategories,
    updateEmail,
    updateUsername
} from "../../../actions";
import SideBar from "../general_components/SideBar";
import Button from "@material-ui/core/Button";
import SourceCard from "../source_components/SourceCard";
import Scrollbars from "react-scrollbars-custom";
import NewSourcePopup from "../add_popups/NewSourcePopup";
import Dialog from "@material-ui/core/Dialog";
import EditProfilePopup from "../add_popups/EditProfilePopup";
import Redirect from "react-router-dom/es/Redirect";
import {makeStyles} from "@material-ui/core/styles";
import ChangePasswordPopup from "../add_popups/ChangePasswordPopup";
import ChangeEmailPopup from "../add_popups/ChangeEmailPopup";
import ChangeUsernamePopup from "../add_popups/ChangeUsernamePopup";

const changeBtnStyle = {
    color: 'white',
    fontFamily: 'houschka-rounded,sans-serif',
    fontWeight: 600,
    fontStyle: 'normal',
    fontSize: '1.5vw',
    textTransform: 'none',
    width: '15vw'
};

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editOpen: false,
            goHome: false,
            changePwdOpen: false,
            changeEmailOpen: false,
            changeUsernameOpen: false
        };
    }


    render() {
        if (this.state.goHome) {
            return (<Redirect to={{
                pathname: '/home',
            }} />);
        }
        const numCategories = this.props.location.state.mapCategories.size;
        let numSources = 0;
        for (let [key, category] of this.props.location.state.mapCategories) {
            numSources += category.sources.length;
        }
        return ( <div className={"main_content"}>
                    <div className={"first-half-profile"}>
                        <Button style={{color: '#a65cff', fontFamily: 'houschka-rounded,sans-serif', fontWeight: 600,
                            fontStyle: 'normal', textTransform: 'none', fontSize: '1.5vw', float: 'left', marginLeft: '2%'}} onClick={() => {this.setState({goHome: true})}}>
                            <img src={'src/images/homeicon.png'} alt={'home icon'} style={{width: '2vw', height: '2vw', marginTop: '-.5vw', marginRight: '.5vw'}} />home
                        </Button>
                        <Button style={{color: '#a65cff', fontFamily: 'houschka-rounded,sans-serif', fontWeight: 600,
                            fontStyle: 'normal', textTransform: 'none', fontSize: '1.5vw', float: 'right', marginRight: '2%'}} onClick={() => {this.setState({editOpen: true})}}>edit profile</Button>
                        <img src={'src/images/icons/' + this.props.profileImg} alt={'profile icon'} id={'profile-img'} />
                        <div className={'profile-name'}>{this.props.firstName} {this.props.lastName}</div>
                        <div id={'num_classes_sources_div'} className={'houshcka_demibold'}>classes: {numCategories} | sources: {numSources}</div>
                        <Scrollbars
                            style={{ height: '34%', margin: '5vh auto auto', width: '70%' }}
                            id='source_scroll_div'
                            thumbYProps={{ className: "thumbY" }}
                            trackXProps={{ className: "trackX" }}
                        >
                            <div className={'profile-description'}>
                                <span style={{whiteSpace: 'pre-line'}}>
                                    {this.props.bio === "" || this.props.bio === undefined ? "empty bio" : this.props.bio}
                                </span>
                            </div>
                        </Scrollbars>
                        <EditProfilePopup userID={this.props.userID} firstName={this.props.firstName} lastName={this.props.lastName} bio={this.props.bio} editProfile={this.props.editProfile}
                                          editOpen={this.state.editOpen} handleClose={() => {this.setState({editOpen: false})}} profileImg={this.props.profileImg}/>
                    </div>
                    <div className={'second-half-profile'}>
                        <img src={'src/images/c-logo.png'} alt={'c logo'} id={'profile-c-logo'} style={{marginTop: '5vw'}} />
                        <div id={'profile-display-name'}>{this.props.username}</div>
                        <div id={'profile-email'}>{this.props.email}</div>
                        <div id={'profile-div-change-btns'}>
                            <Button onClick={() => this.setState({changeUsernameOpen: true})} style={changeBtnStyle}>change username</Button>
                            <Button onClick={() => this.setState({changeEmailOpen: true})} style={changeBtnStyle}>change email</Button>
                            <Button onClick={() => this.setState({changePwdOpen: true})} style={changeBtnStyle}>change password</Button>
                        </div>
                        {/*<div id={'num-classes-div'}>classes {numCategories}</div>*/}
                        {/*<div id={'num-sources-div'}>sources {numSources}</div>*/}
                        <ChangePasswordPopup userID={this.props.userID} changePwdOpen={this.state.changePwdOpen}
                                             handleClose={() => {this.setState({changePwdOpen: false})}} />
                        <ChangeEmailPopup userID={this.props.userID} currEmail={this.props.email} changeEmailOpen={this.state.changeEmailOpen}
                                            handleClose={() => {this.setState({changeEmailOpen: false})}} updateEmail={this.props.updateEmail}/>
                        <ChangeUsernamePopup userID={this.props.userID} popupOpen={this.state.changeUsernameOpen} currUsername={this.props.username}
                                            handleClose={() => {this.setState({changeUsernameOpen: false})}} updateUsername={this.props.updateUsername} />
                    </div>
                </div>);
    }
}

function mapStateToProps(state) {
    return {
        userID: state.signin.userID,
        email: state.signin.email,
        firstName: state.signin.firstName,
        lastName: state.signin.lastName,
        bio: state.signin.bio,
        username: state.signin.username,
        profileImg: state.signin.profileImg
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: () => {
            dispatch(signoutUser())
        },
        editProfile: (firstName, lastName, bio, profileImg) => {
            dispatch(editProfile(firstName, lastName, bio, profileImg))
        },
        updateEmail: (email) => {
            dispatch(updateEmail(email))
        },
        updateUsername: (username) => {
            dispatch(updateUsername(username))
        }
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer