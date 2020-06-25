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
        marginTop: '0',
        marginLeft: '15.6vw',
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
                    setErrorMsg("success");
                    props.onSuccess(xhr.response)
                }
            });
            xhr.open('POST', 'http://localhost:3000/verify_code', false);
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
            <input name={'verify_code'} value={verifyCode} onChange={handleInputChange} style={{marginTop: '10vw'}} />
            {errorMsg === "" ? <Button onClick={handleSubmit} className={classes.submitStyleBtn}>Submit</Button> :
            <div>{errorMsg}</div>}
        </div>
    );
}
