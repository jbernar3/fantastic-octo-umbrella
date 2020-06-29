import makeStyles from "@material-ui/core/styles/makeStyles";
import * as React from "react";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

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
        margin: '3.5vw auto',
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

export default function ForgotPwdPopup(props) {
    const classes = useStyles();
    const [email, setEmail] = React.useState("");
    const [errMsg, setErrMsg] = React.useState("");
    const [showConfirmation, setShowConfirmation] = React.useState(false);

    const handleClose = () => {
        setEmail("");
        setErrMsg("");
        setShowConfirmation(false);
        props.handleClose();
    };

    const handleInputChange = (event) => {
        setEmail(event.target.value);
        setErrMsg("");
        setShowConfirmation(false);
    };

    const handleSubmit = () => {
        if (email === "") {
            setErrMsg("must enter email address")
        } else {
            const postParameters = {
                email: email
            };

            const xhr = new XMLHttpRequest();
            xhr.addEventListener('load', () => {
                if (xhr.response.includes("ERROR:")) {
                    setErrMsg(xhr.response.substring(6));
                } else {
                    setShowConfirmation(true);
                }
            });
            xhr.open('POST', 'http://localhost:3000/forgot_password', false);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(postParameters));
        }
    };

    return (
        <div id={'forgot-password-popup'}>
            <CloseIcon onClick={handleClose} style={closeIconStyle} />
            {showConfirmation ? <div id={'confirm-div-forgot-pwd'} className={'houshcka_demibold'}>
                <div>check email sent to</div>
                <div id={'email-confirm-div-forgot-pwd'}>{email}</div>
                <div>for your temporary password</div>
                </div> : <div>
                <div id={'forgot-pwd-email-div'} className={'text-input-profile-description'}>email</div>
                <input id={'email-input-forgot-pwd'} name={'email'} value={email} onChange={handleInputChange} />
                {errMsg === "" ? <Button onClick={handleSubmit} className={classes.submitBtnStyle}>done</Button> :
                    <div id={'forgot-pwd-err'} className={'houshcka_demibold'}>{errMsg}</div>}
                </div>}
        </div>
    )
}