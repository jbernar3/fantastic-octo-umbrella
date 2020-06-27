import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import Scrollbars from "react-scrollbars-custom";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CloseIcon from "@material-ui/icons/Close";
import VerificationCodePopup from "./VerificationCodePopup";

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
        marginLeft: '15.6vw',
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

export default function ChangeEmailPopup(props) {
    const [newEmail, setNewEmail] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState("");
    const [showVerifyCode, setShowVerifyCode] = React.useState(false);
    const classes = useStyles();

    const handleInputChange = (event) => {
        const eventName = event.target.name;
        const eventValue = event.target.value;
        setErrorMsg("");
        if (eventName === "new_email") {
            setNewEmail(eventValue);
        }
    };

    const resetInputs = () => {
        setErrorMsg("");
        setNewEmail("");
        setShowVerifyCode(false);
    };

    const handleSubmit = () => {
        if (newEmail === "") {
            setErrorMsg("please enter email address");
        } else {
            const postParameters = {
                userID: props.userID,
                newEmail: newEmail
            };

            const xhr = new XMLHttpRequest();
            xhr.addEventListener('load', () => {
                if (xhr.response.includes("ERROR:")) {
                    setErrorMsg(xhr.response.substring(6));
                } else if (xhr.response === "success") {
                    setShowVerifyCode(true);
                }
            });
            xhr.open('POST', 'http://localhost:3000/change_email', false);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(postParameters));
        }
    };

    const handleClose = () => {
        props.handleClose();
        resetInputs();
    };

    const onSuccess = (email) => {
        props.updateEmail(email);
        handleClose();
    };

    return (
        <div>
            <Dialog
                open={props.changeEmailOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth={false}
            >
                {showVerifyCode ? <VerificationCodePopup userID={props.userID} email={newEmail} handleClose={handleClose} onSuccess={onSuccess} /> :
                    <div id={'change-email-popup'}>
                        <CloseIcon onClick={handleClose} style={closeIconStyle} />
                        <div className={'houshcka_medium'} style={{fontSize: '1.2vw', marginTop: '14.5vw', marginLeft: '7.5vw'}}>
                            current email
                        </div>
                        <div id={'curr-email-div'} className={'houshcka_demibold'}>
                            {props.currEmail}
                        </div>
                        <div className={'houshcka_medium'} style={{fontSize: '1.2vw', marginTop: '3vw', marginLeft: '7.5vw'}}>
                            new email
                        </div>
                        <div style={{marginTop: '.5vw'}}>
                            <input className={'change-pwd-input new-cat-inputs'}
                                   name={'new_email'} value={newEmail} onChange={handleInputChange} />
                        </div>
                        {errorMsg !== "" ? <div id={'change-email-error-div'} className={'houshcka_demibold'}>{errorMsg}</div> :
                            <Button onClick={handleSubmit} className={classes.submitBtnStyle}>change email</Button>}
                    </div>
                }
            </Dialog>
        </div>
    );
}
