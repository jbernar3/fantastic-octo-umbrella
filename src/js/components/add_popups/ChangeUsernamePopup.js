import * as constants from "../../constants.js";
import Zoom from '@material-ui/core/Zoom';
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    submitBtnStyle: {
        backgroundColor: 'rgba(166, 92, 254, 0.09)',
        borderRadius: '7px',
        border: 'none',
        fontFamily: 'houschka-rounded,sans-serif',
        fontWeight: 700,
        fontStyle: 'normal',
        fontSize: '1.2vw',
        color: '#a65cff',
        textTransform: 'none',
        marginTop: '5vw',
        marginLeft: '14.5vw',
        paddingLeft: '1.8vw',
        paddingRight: '1.8vw',
        '&:hover': {
            backgroundColor: 'rgba(166,92,254,0.2)'
        }
    }
}));

const doneBtnStyle = {
    backgroundColor: 'rgba(166, 92, 254, 0.09)',
    borderRadius: '7px',
    border: 'none',
    fontFamily: 'houschka-rounded,sans-serif',
    fontWeight: 700,
    fontStyle: 'normal',
    fontSize: '1.2vw',
    color: '#a65cff',
    textTransform: 'none',
    marginTop: '36vw',
    marginLeft: '17.5vw',
    paddingLeft: '1.8vw',
    paddingRight: '1.8vw'
};

const closeIconStyle = {
    fill: '#a65cff',
    width: '2.5vw',
    float: 'right',
    marginTop:  '1.5vw',
    marginRight: '1.2vw',
    cursor: 'pointer'
};

export default function ChangeUsernamePopup(props) {
    const [newUsername, setNewUsername] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState("");
    const classes = useStyles();

    const handleInputChange = (event) => {
        const eventName = event.target.name;
        const eventValue = event.target.value;
        setErrorMsg("");
        if (eventName === "new_username") {
            setNewUsername(eventValue);
        }
    };

    const resetInputs = () => {
        setErrorMsg("");
        setNewUsername("");
    };

    const handleSubmit = () => {
        if (newUsername === "" || newUsername === props.currUsername) {
            setErrorMsg("please enter new username");
        } else {
            const postParameters = {
                userID: props.userID,
                newUsername: newUsername
            };

            const xhr = new XMLHttpRequest();
            xhr.addEventListener('load', () => {
                if (xhr.response.includes("ERROR:")) {
                    setErrorMsg(xhr.response.substring(6));
                } else if (xhr.response === "success") {
                    props.updateUsername(newUsername);
                    handleClose();
                }
            });
            // xhr.open('POST', 'http://localhost:3000/change_username', false);
            xhr.open('POST', constants.HOST_NAME + 'change_username', false);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(postParameters));
        }
    };

    const handleClose = () => {
        props.handleClose();
        resetInputs();
    };

    return (
        <div>
            <Dialog
                open={props.popupOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth={false}
            >
                <div id={'change-username-popup'}>
                    <CloseIcon onClick={handleClose} style={closeIconStyle} />
                    <div className={'houshcka_medium'} style={{fontSize: '1.2vw', marginTop: '14.5vw', marginLeft: '7.5vw'}}>
                        current username
                    </div>
                    <div id={'curr-email-div'} className={'houshcka_demibold'}>
                        {props.currUsername}
                    </div>
                    <div className={'houshcka_medium'} style={{fontSize: '1.2vw', marginTop: '3vw', marginLeft: '7.5vw'}}>
                        new username
                    </div>
                    <div style={{marginTop: '.5vw'}}>
                        <input className={'change-pwd-input new-cat-inputs'}
                               name={'new_username'} value={newUsername} onChange={handleInputChange} />
                    </div>
                    {errorMsg !== "" ? <div id={'change-email-error-div'} className={'houshcka_demibold'}>{errorMsg}</div> :
                        <Button onClick={handleSubmit} className={classes.submitBtnStyle}>change username</Button>}
                </div>
            </Dialog>
        </div>
    );
}
