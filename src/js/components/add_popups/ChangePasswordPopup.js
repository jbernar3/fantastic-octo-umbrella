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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

// const useStyles = makeStyles(theme => ({
//     textInput: {
//         outline: 'none',
//         borderRadius: '7px',
//         backgroundColor: 'rgba(167,93,255,0.15)',
//         borderStyle: 'solid'
//     },
//     outlinedRoot: {
//         fontFamily: 'houschka-rounded,sans-serif',
//         fontWeight: 500,
//         fontStyle: 'normal',
//         fontSize: '13pt',
//         color: '#a65cff',
//         paddingTop: '2px',
//         paddingBottom: '2px',
//         borderColor: '#ffffff',
//         borderWidth: '1px',
//         '&:hover $notchedOutline': {
//             borderColor: '#a65cff',
//             borderWidth: '1px'
//         },
//         '&$focused $notchedOutline': {
//             borderColor: '#a65cff',
//             borderWidth: '3px',
//         },
//     },
//     outlinedRootShort: {
//         fontFamily: 'houschka-rounded,sans-serif',
//         fontWeight: 600,
//         fontStyle: 'normal',
//         fontSize: '13pt',
//         color: '#a65cff',
//         paddingTop: '2px',
//         paddingBottom: '2px',
//         borderColor: '#ffffff',
//         borderWidth: '1px',
//         height: '50px',
//         '&:hover $notchedOutline': {
//             borderColor: '#a65cff',
//             borderWidth: '1px'
//         },
//         '&$focused $notchedOutline': {
//             borderColor: '#a65cff',
//             borderWidth: '3px',
//         },
//     },
//     notchedOutline: {},
//     focused: {},
// }));

const submitBtnStyle = {
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

export default function EditProfilePopup(props) {
    const [currPassword, setCurrPassword] = React.useState("");
    const [showCurrPwd, setShowCurrPwd] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState("");
    const [showNewPwd, setShowNewPwd] = React.useState(false);
    const [confirmPwd, setConfirmPwd] = React.useState("");
    const [showConfirmPwd, setShowConfirmPwd] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");

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
                    handleClose();
                }
            });
            xhr.open('POST', 'http://localhost:3000/change_password', false);
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
                <div id={'change-password-popup'}>
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
                        <Button onClick={handleSubmit} style={submitBtnStyle}>change password</Button>}
                </div>
            </Dialog>
        </div>
    );
}
