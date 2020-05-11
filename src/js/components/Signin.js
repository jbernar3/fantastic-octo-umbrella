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
import {signinUser} from "../../actions";
import {connect} from "react-redux";

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
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

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
                setErrorMsg("Incorrect username or password.");
            } else if (xhr.response === "error") {
                setErrorMsg("Error signing up. Please try again.");
            } else {
                setErrorMsg("");
                const user = JSON.parse(xhr.response);
                console.log(user);
                props.onSignin(user._id, user.email, user.first_name, user.last_name);
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
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handleChange}
                        />
                        {errorMsg !== "" ? <div>{errorMsg}</div> : ""}
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={email === "" || password === ""}
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/#/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>

                </div>
            </Grid>
        </Grid>
    );
}

class Signin extends Component {
    
    render() {
        return (<SignInSide onSignin={this.props.onClick} auth={this.props.auth}/>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (userID, email, fName, lName) => {
            dispatch(signinUser(userID, email, fName, lName))
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