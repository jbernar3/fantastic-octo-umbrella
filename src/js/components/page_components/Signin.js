import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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
import backgroundImg from "../../../images/signin-background.jpg"

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
        backgroundColor: "#ffffff"
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

    const handleSubmit = (event) => {
        const postParameters = {
            email : email,
            password : password
        };

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
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
                console.log(user.categories);
                props.onSignin(user._id, user.email, user.first_name, user.last_name, user.categories);
                setSignedIn(true);
            }
        });
        xhr.open('POST', 'http://localhost:3000/signin', false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(postParameters));
    };

    if (signedIn || props.auth) {
        return (<Redirect to={"home"}/>);
    }
    return (
        <div id={"signin-container"}>
            <div className={classes.root} style={{marginLeft: '60%', marginTop: '20%', alignContent: 'center'}}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <input id="email" placeholder="email address" name={"email"} onChange={handleChange} value={email} style={{border: "1px #000000", borderRadius: "5px"}} className={classes.paper} />
                    </Grid>
                    <Grid item xs={12}>
                        <input type={"password"} placeholder="password" id="password" name={"password"} onChange={handleChange} value={password} style={{border: "1px #000000", borderRadius: "5px"}} className={classes.paper} />
                        <br /><br />
                        <div style={{color: "#ffffff", marginLeft: "142px"}}>forgot Password?</div>
                    </Grid>
                    <Grid item xs={12} style={{marginLeft: "22.85%"}}>
                        <Button onClick={handleSubmit} disabled={email === "" || password === ""} style={{backgroundColor: "#ffffff", align: "center", paddingLeft: "50px", paddingRight: "50px", paddingTop: "10px", paddingBottom: "10px"}}>
                            Signin
                        </Button><br /><br />
                        <Link href="/#/signup" variant="body2" style={{color: "#ffffff", marginLeft: "-25px"}}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                        {errorMsg !== "" ? <div>{errorMsg}</div> : ""}
                    </Grid>
                    {/*<Grid item xs={3}>*/}
                    {/*    <Paper className={classes.paper}>xs=3</Paper>*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={3}>*/}
                    {/*    <Paper className={classes.paper}>xs=3</Paper>*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={3}>*/}
                    {/*    <Paper className={classes.paper}>xs=3</Paper>*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={3}>*/}
                    {/*    <Paper className={classes.paper}>xs=3</Paper>*/}
                    {/*</Grid>*/}
                </Grid>
            </div>
        </div>
        // <Grid container component="main" className={classes.root}>
        //     <CssBaseline />
        //     <Grid item xs={false} sm={4} md={7} className={classes.image} />
        //     <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        //         <div className={classes.paper}>
        //             <Avatar className={classes.avatar}>
        //                 <LockOutlinedIcon />
        //             </Avatar>
        //             <Typography component="h1" variant="h5">
        //                 Sign in
        //             </Typography>
        //                 <TextField
        //                     variant="outlined"
        //                     margin="normal"
        //                     required
        //                     fullWidth
        //                     id="email"
        //                     label="Email Address"
        //                     name="email"
        //                     autoComplete="email"
        //                     autoFocus
        //                     value={email}
        //                     onChange={handleChange}
        //                 />
        //                 <TextField
        //                     variant="outlined"
        //                     margin="normal"
        //                     required
        //                     fullWidth
        //                     name="password"
        //                     label="Password"
        //                     type="password"
        //                     id="password"
        //                     autoComplete="current-password"
        //                     value={password}
        //                     onChange={handleChange}
        //                 />
        //                 {errorMsg !== "" ? <div>{errorMsg}</div> : ""}
        //                 <FormControlLabel
        //                     control={<Checkbox value="remember" color="primary" />}
        //                     label="Remember me"
        //                 />
        //                 <Button
        //                     type="submit"
        //                     fullWidth
        //                     variant="contained"
        //                     color="primary"
        //                     className={classes.submit}
        //                     disabled={email === "" || password === ""}
        //                     onClick={handleSubmit}
        //                 >
        //                     Sign In
        //                 </Button>
        //                 <Grid container>
        //                     <Grid item xs>
        //                         <Link href="#" variant="body2">
        //                             Forgot password?
        //                         </Link>
        //                     </Grid>
        //                     <Grid item>
        //                         <Link href="/#/signup" variant="body2">
        //                             {"Don't have an account? Sign Up"}
        //                         </Link>
        //                     </Grid>
        //                 </Grid>
        //                 <Box mt={5}>
        //                     <Copyright />
        //                 </Box>
        //
        //         </div>
        //     </Grid>
        // </Grid>
    );
}

class Signin extends Component {
    
    render() {
        return (<SignInSide onSignin={this.props.onClick} auth={this.props.auth}/>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (userID, email, fName, lName, categories) => {
            dispatch(signinUser(userID, email, fName, lName, categories))
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