import Zoom from '@material-ui/core/Zoom';
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CloseIcon from "@material-ui/icons/Close";
import * as constants from "../../constants.js";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    doneBtnStyle: {
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
        paddingRight: '1.8vw',
        '&:hover': {
            backgroundColor: 'rgba(166,92,254,0.2)'
        }
    },
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
        marginTop: '2.5vw',
        marginLeft: '14.35vw',
        paddingLeft: '1.8vw',
        paddingRight: '1.8vw',
        '&:hover': {
            backgroundColor: 'rgba(166,92,254,0.2)'
        }
    }
}));

const closeIconStyle = {
    fill: '#a65cff',
    width: '2.5vw',
    float: 'right',
    marginTop:  '1.5vw',
    marginRight: '1.2vw',
    cursor: 'pointer'
};

export default function ChangePasswordPopup(props) {
    const [currPassword, setCurrPassword] = React.useState("");
    const [showCurrPwd, setShowCurrPwd] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState("");
    const [showNewPwd, setShowNewPwd] = React.useState(false);
    const [confirmPwd, setConfirmPwd] = React.useState("");
    const [showConfirmPwd, setShowConfirmPwd] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [showVerifConfirm, setShowVerifConfirm] = React.useState(false);
    const classes = useStyles();

    const handleInputChange = (event) => {
        const eventName = event.target.name;
        const eventValue = event.target.value;
        setErrorMsg("");
        if (eventName === "curr_password") {
            setCurrPassword(eventValue);
        } else if (eventName === "new_password") {
            setNewPassword(eventValue);
        } else if (eventName === "confirm_password") {
            setConfirmPwd(eventValue);
        }
    };

    const resetInputs = () => {
        setCurrPassword("");
        setShowCurrPwd(false);
        setNewPassword("");
        setShowNewPwd(false);
        setConfirmPwd("");
        setShowConfirmPwd(false);
        setErrorMsg("");
        setShowVerifConfirm(false);
    };

    const handleSubmit = () => {
        if (newPassword !== confirmPwd) {
            setErrorMsg("passwords do not match");
        } else {
            const postParameters = {
                userID: props.userID,
                currPassword: currPassword,
                newPassword: newPassword
            };

            const xhr = new XMLHttpRequest();
            xhr.addEventListener('load', () => {
                if (xhr.response.includes("ERROR:")) {
                    setErrorMsg(xhr.response.substring(6));
                } else if (xhr.response === "success") {
                    setShowVerifConfirm(true);
                }
            });
            // xhr.open('POST', 'http://localhost:3000/change_password', false);
            xhr.open('POST', constants.HOST_NAME + 'change_password', false);
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
                open={props.changePwdOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth={false}
            >
                {showVerifConfirm ?
                    (<div id={'verified-password-change'}>
                        <Button onClick={handleClose} className={classes.doneBtnStyle}>done</Button>
                    </div>) : (<div id={'change-password-popup'}>
                        <CloseIcon onClick={handleClose} style={closeIconStyle} />
                        <div className={'houshcka_medium'} style={{fontSize: '1.2vw', marginTop: '12vw', marginLeft: '7.5vw'}}>
                            current password <div className={'show-hide-div'} onClick={() => setShowCurrPwd(!showCurrPwd)}>{showCurrPwd ? "hide" : "show"}</div>
                        </div>
                        <div style={{marginTop: '.5vw'}}>
                            {showCurrPwd ? <input className={'change-pwd-input new-cat-inputs'}
                                                  name={'curr_password'} value={currPassword} onChange={handleInputChange} /> :
                                <input className={'change-pwd-input new-cat-inputs'} type={'password'} name={'curr_password'}
                                       value={currPassword} onChange={handleInputChange} />
                            }
                        </div>
                        <div className={'houshcka_medium'} style={{fontSize: '1.2vw', marginTop: '2vw', marginLeft: '7.5vw'}}>
                            new password <div className={'show-hide-div'} onClick={() => setShowNewPwd(!showNewPwd)}>{showNewPwd ? "hide" : "show"}</div>
                        </div>
                        <div style={{marginTop: '.5vw'}}>
                            {showNewPwd ? <input className={'change-pwd-input new-cat-inputs'}
                                                 name={'new_password'} value={newPassword} onChange={handleInputChange} /> :
                                <input className={'change-pwd-input new-cat-inputs'} type={'password'}
                                       name={'new_password'} value={newPassword} onChange={handleInputChange} />
                            }
                        </div>
                        <div className={'houshcka_medium'} style={{fontSize: '1.2vw', marginTop: '2vw', marginLeft: '7.5vw'}}>
                            confirm new password <div className={'show-hide-div'} onClick={() => setShowConfirmPwd(!showConfirmPwd)}>{showConfirmPwd ? "hide" : "show"}</div>
                        </div>
                        <div style={{marginTop: '.5vw'}}>
                            {showConfirmPwd ? <input className={'change-pwd-input new-cat-inputs'}
                                                     name={'confirm_password'} value={confirmPwd} onChange={handleInputChange} /> :
                                <input className={'change-pwd-input new-cat-inputs'} type={'password'}
                                       name={'confirm_password'} value={confirmPwd} onChange={handleInputChange} />
                            }
                        </div>
                        {errorMsg !== "" ? <div id={'change-pwd-error-div'} className={'houshcka_demibold'}>{errorMsg}</div> :
                            <Button onClick={handleSubmit} className={classes.submitBtnStyle}>change password</Button>}
                    </div>)}
            </Dialog>
        </div>
    );
}
