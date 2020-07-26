import React from "react";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CloseIcon from "@material-ui/icons/Close";
import * as constants from "../../constants.js";

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
        margin: '5vw auto',
        paddingLeft: '1.8vw',
        paddingRight: '1.8vw',
        display: 'block',
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

export default function VerificationCodePopup(props) {
    const [verifyCode, setVerifyCode] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState("");
    const classes = useStyles();

    const handleInputChange = (event) => {
        const eventName = event.target.name;
        const eventValue = event.target.value;
        setErrorMsg("");
        if (eventName === "verify_code") {
            setVerifyCode(eventValue);
        }
    };

    const resetInputs = () => {
        setErrorMsg("");
        setVerifyCode("");
    };

    const handleSubmit = () => {
        if (verifyCode.length !== 6) {
            setErrorMsg("verification code must be 6 digits");
        } else {
            const postParameters = {
                userID: props.userID,
                verifyCode: verifyCode
            };

            const xhr = new XMLHttpRequest();
            xhr.addEventListener('load', () => {
                if (xhr.response.includes("ERROR:")) {
                    setErrorMsg(xhr.response.substring(6));
                } else {
                    resetInputs();
                    props.onSuccess(xhr.response)
                }
            });
            // xhr.open('POST', 'http://localhost:3000/verify_code', false);
            xhr.open('POST', constants.HOST_NAME + 'verify_code', false);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(postParameters));
        }
    };

    const handleClose = () => {
        props.handleClose();
        resetInputs();
    };

    return (
        <div id={'verify-code-popup'}>
            <CloseIcon onClick={handleClose} style={closeIconStyle} />
            <div id={'message-verification-div'} className={'houshcka_demibold'}>Please enter the six-digit code sent to:</div>
            <div id={'email-verification-div'} className={'houshcka_demibold'}>{props.email}</div>
            <input name={'verify_code'} id={'code-input'} value={verifyCode} onChange={handleInputChange} />
            {errorMsg === "" ? <Button onClick={handleSubmit} className={classes.submitBtnStyle}>submit</Button> :
            <div id={'verification-err-div'} className={'houshcka_demibold'}>{errorMsg}</div>}
        </div>
    );
}
