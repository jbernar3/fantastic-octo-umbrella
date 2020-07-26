import * as constants from "../../constants.js";
import Zoom from '@material-ui/core/Zoom';
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Scrollbars from "react-scrollbars-custom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from "@material-ui/icons/Close";
import ChooseProfileImagePopup from "./ChooseProfileImagePopup";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

const closeIconStyle = {
    fill: '#a65cff',
    width: '2.5vw',
    float: 'right',
    marginTop:  '1.5vw',
    marginRight: '1.2vw',
    cursor: 'pointer'
};

const useStyles = makeStyles(theme => ({
    textInput: {
        outline: 'none',
        borderRadius: '7px',
        backgroundColor: 'rgba(167,93,255,0.15)',
        borderStyle: 'solid'
    },
    outlinedRoot: {
        fontFamily: 'houschka-rounded,sans-serif',
        fontWeight: 500,
        fontStyle: 'normal',
        fontSize: '13pt',
        color: '#a65cff',
        paddingTop: '2px',
        paddingBottom: '2px',
        borderColor: '#ffffff',
        borderWidth: '1px',
        '&:hover $notchedOutline': {
            borderColor: '#a65cff',
            borderWidth: '1px'
        },
        '&$focused $notchedOutline': {
            borderColor: '#a65cff',
            borderWidth: '3px',
        },
    },
    outlinedRootShort: {
        fontFamily: 'houschka-rounded,sans-serif',
        fontWeight: 600,
        fontStyle: 'normal',
        fontSize: '13pt',
        color: '#a65cff',
        paddingTop: '2px',
        paddingBottom: '2px',
        borderColor: '#ffffff',
        borderWidth: '1px',
        height: '50px',
        '&:hover $notchedOutline': {
            borderColor: '#a65cff',
            borderWidth: '1px'
        },
        '&$focused $notchedOutline': {
            borderColor: '#a65cff',
            borderWidth: '3px',
        },
    },
    notchedOutline: {},
    focused: {},
}));

export default function EditProfilePopup(props) {
    const [updatedFName, setFName] = React.useState(props.firstName);
    const [updatedLName, setLName] = React.useState(props.lastName);
    const [updatedBio, setBio] = React.useState(props.bio);
    const [updatedImg, setImg] = React.useState(props.profileImg);
    const [profileImgOpen, setProfileImgOpen] = React.useState(false);

    const classes = useStyles();
    const InputProps = {
        classes: {
            root: classes.outlinedRoot,
            notchedOutline: classes.notchedOutline,
            focused: classes.focused
        },
    };

    const handleOnInput = (event) => {
        event.target.style.height = "";
        event.target.style.height = event.target.scrollHeight + "px";
    };

    const handleInputChange = (event) => {
        const eventName = event.target.name;
        console.log(event.target.name);
        const eventValue = event.target.value;
        if (eventName === "fName") {
            setFName(eventValue);
        } else if (eventName === "lName") {
            setLName(eventValue);
        } else if (eventName === "bio") {
            setBio(eventValue);
        }
    };

    const handleSubmit = () => {
        const postParameters = {
            userID: props.userID,
            firstName: updatedFName,
            lastName: updatedLName,
            bio: updatedBio,
            profileImg: updatedImg
        };

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.response.includes("ERROR:")) {
                console.log("handle edit profile error");
            } else if (xhr.response === "success") {
                props.handleClose();
                props.editProfile(updatedFName, updatedLName, updatedBio, updatedImg);
            }
        });
        // xhr.open('POST', 'http://localhost:3000/edit_profile', false);
        xhr.open('POST', constants.HOST_NAME + 'edit_profile', false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(postParameters));
    };

    return (
        <div>
            <Dialog
                open={props.editOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth={false}
            >
                <div id={'edit-profile-popup'}>
                    <CloseIcon onClick={props.handleClose} style={closeIconStyle} />
                    <Tooltip title={'edit profile image'}>
                        <img id={'img-edit-profile'} src={'src/images/icons/' + updatedImg} alt={'profile icon'} onClick={() => setProfileImgOpen(true)} />
                    </Tooltip>
                    <div className={'text-input-profile-description'} style={{float: 'left', marginLeft: '4.6vw'}}>first name</div>
                    <div className={'text-input-profile-description'} style={{float: 'right', marginRight: '9vw'}}>last name</div>
                    <input id={'new-fname'} className={'new-cat-inputs'} name={'fName'} value={updatedFName} onChange={handleInputChange} />
                    <input id={'new-lname'} className={'new-cat-inputs'} name={'lName'} value={updatedLName} onChange={handleInputChange} />
                    <div id={'bio-input-profile-description'}>bio (250 characters max)</div>
                    <Scrollbars
                        style={{width: '34vw', height: '13.7vw', marginTop: '3.5vw', marginLeft: '4.5vw'}}
                        //id='source_scroll_div'
                        thumbYProps={{ className: "thumbY" }}
                        trackXProps={{ className: "trackX" }}
                    >
                        <textarea id={'bio-textarea'} className={'scrollable-textarea'} name={'bio'} value={updatedBio} onChange={handleInputChange} onInput={handleOnInput} />
                    </Scrollbars>
                    <Button id={'update-profile-btn'} onClick={handleSubmit}>Update Profile</Button>
                </div>
            </Dialog>
            <ChooseProfileImagePopup popupOpen={profileImgOpen} handleClose={() => setProfileImgOpen(false)}
                                     profileImg={props.profileImg !== undefined ? props.profileImg.toString() : ""} updateImg={(img) => setImg(img)} />
        </div>
    );
}
