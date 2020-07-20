import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import regeneratorRuntime from "regenerator-runtime";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import {signinUser} from "../../../actions";
import {connect} from "react-redux";
import {spacing} from "@material-ui/system"
import backgroundImg from "../../../images/signup-back.jpg"
import VerificationCodePopup from "../add_popups/VerificationCodePopup";
import Dialog from "@material-ui/core/Dialog";
import Zoom from "@material-ui/core/Zoom";
import ForgotPwdPopup from "../add_popups/ForgotPwdPopup";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '35%',
        //float: 'right',
    },
    paper: {
        padding: theme.spacing(1),
        height: '35px',
        width: '80%',
        //textAlign: 'center',
        backgroundColor: "#ffffff",
        fontFamily: 'houschka-rounded,sans-serif',
        fontWeight: 600,
        fontStyle: 'normal',
    },
}));

// const useStyles = makeStyles((theme) => ({
//     root: {
//         height:'100%',
//     },
//     image: {
//         backgroundImage: 'url(https://source.unsplash.com/random)',
//         backgroundRepeat: 'no-repeat',
//         backgroundColor:
//             theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//     },
//     paper: {
//         margin: theme.spacing(8, 4),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     avatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: '100%', // Fix IE 11 issue.
//         marginTop: theme.spacing(1),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },
// }));

function SignInSide(props) {
    const classes = useStyles();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [signedIn, setSignedIn] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [userCategories, setUserCategories] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [showVerification, setShowVerification] = React.useState(false);
    const [verifyEmail, setVerifyEmail] = React.useState("");
    const [userNeedVerify, setUserNeedVerify] = React.useState(null);
    const [showForgotPwd, setShowForgotPwd] = React.useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setErrorMsg("");
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handleClose = () => {
        setShowVerification(false);
        setUserNeedVerify(null);
        setVerifyEmail("");
    };

    const handleSubmit = () => {
        const postParameters = {
            email: email,
            password: password
        };

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            setLoading(false);
            if (xhr.response === "dne") {
                console.log("DNE");
                setErrorMsg("Incorrect username or password.");
            } else if (xhr.response === "incorrect password") {
                setErrorMsg("Incorrect password.")
            } else if (xhr.response === "error") {
                setErrorMsg("Error signing up. Please try again.");
            } else {
                setErrorMsg("");
                const user = JSON.parse(xhr.response);
                console.log("This is user.");
                console.log(user);
                if (user.needsVerification) {
                    setVerifyEmail(user.email);
                    setShowVerification(true);
                    setUserNeedVerify(user);
                } else {
                    handleSignin(user);
                }
            }
        });
        xhr.open('POST', 'http://localhost:3000/signin', false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(postParameters));
    };

    const handleSignin = (user) => {
        console.log("IN USER HANDLE SIGNIN");
        console.log(user);
        props.onSignin(user._id, user.email, user.first_name, user.last_name, user.bio, user.username, user.profileImg);
        // setUserCategories(user.categories);
        setSignedIn(true);
    };

    if (signedIn || props.auth) {
        return (<Redirect to={{
            pathname: 'home',
            // state: { categories: userCategories }
        }}/>);

    }
    return (
        <div id={"signin-container"}>
            <div className={classes.root} style={{marginLeft: '60%', marginTop: '16%', alignContent: 'center'}}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        {errorMsg !== "" ? <input id="email" placeholder="email address" name={"email"} onChange={handleChange} value={email}
                                                  className={'signin-error'} /> :
                            <input id="email" placeholder="email address" name={"email"} onChange={handleChange} value={email}
                                   className={'signin-input'} />}
                    </Grid>
                    <Grid item xs={12}>
                        {errorMsg !== "" ? <input type={"password"} placeholder="password" id="signin-password" name={"password"} onChange={handleChange} value={password}
                                                   className={'signin-error'} /> :
                            <input type={"password"} placeholder="password" id="password" name={"password"} onChange={handleChange} value={password}
                                   className={'signin-input'} />}

                        <br /><br />
                        {errorMsg !== "" ? <Link href="/#/signup" variant="body2" style={{color: "#ffffff", marginLeft: "35px"}}>{"Incorrect Username or Password. Forgot password?"}</Link> :
                            <Link onClick={() => setShowForgotPwd(true)} variant="body2" style={{color: "#ffffff"}}>
                                <div className={"houshcka_demibold"} style={{marginLeft: "138px", cursor: 'pointer'}}>Forgot password?</div>
                            </Link>}

                    </Grid>
                    <Grid item xs={12} style={{marginLeft: "22.85%"}}>
                        {loading ? <img src={'src/images/temp_loading.gif'} alt={"Loading gif"}/>: ""}
                        <Button onClick={() => {setLoading(true); setTimeout(function cb() {
                            handleSubmit();
                        }, 0)}} disabled={email === "" || password === ""} style={{backgroundColor: "#ffffff", align: "center", paddingLeft: "50px", paddingRight: "50px", paddingTop: "10px", paddingBottom: "10px"}}>
                            <div className={'houshcka_demibold'}>sign in</div>
                        </Button><br /><br />
                        <Link href="/#/signup" variant="body2" style={{color: "#ffffff"}}>
                            {<div className={'houshcka_demibold'} style={{marginLeft: "-22px"}}>Don't have an account? Sign Up</div>}
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <Dialog
                open={showVerification}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth={false}
            >
                <VerificationCodePopup userID={userNeedVerify === null ? null : userNeedVerify._id} email={verifyEmail} handleClose={handleClose} onSuccess={() => handleSignin(userNeedVerify)} />
            </Dialog>
            <Dialog
                open={showForgotPwd}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setShowForgotPwd(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth={false}
            >
                <ForgotPwdPopup handleClose={() => setShowForgotPwd(false)} />
            </Dialog>
        </div>
    );
}

class Signin extends Component {
    
    render() {
        return (<SignInSide onSignin={this.props.onClick} auth={this.props.auth}/>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (userID, email, fName, lName, bio, username, profileImg) => {
            dispatch(signinUser(userID, email, fName, lName, bio, username, profileImg))
        }
    };
};

function mapStateToProps(state) {
    return {
        auth: state.signin.email !== "",
    }
}


const SigninContainer = connect(mapStateToProps, mapDispatchToProps)(Signin);

export default SigninContainer