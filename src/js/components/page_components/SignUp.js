import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Arma
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

export default function SignUp(props) {
    const classes = useStyles();
    const [fName, setFName] = React.useState("");
    const [lName, setLName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [wantsPromMsg, setWantsPromMsg] = React.useState(false);
    const [signedUp, setSignedUp] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === "firstName") {
            setFName(value);
        } else if (name === "lastName") {
            setLName(value);
        } else if (name === "email") {
            setErrorMsg("");
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = () => {
        const postParameters = {
            firstName : fName,
            lastName : lName,
            email : email,
            password : password,
            wantsPromotions : wantsPromMsg
        };

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            console.log(xhr.response);
            if (xhr.response === "user exists") {
                setErrorMsg("Email address already registered. Please sign in.");
            } else if (xhr.response === "error") {
                setErrorMsg("Error signing up. Please try again.");
            } else {
                setErrorMsg("");
                console.log(JSON.parse(xhr.response)._id);
                setSignedUp(true);
            }
        });
        xhr.open('POST', 'http://localhost:3000/signup', false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(postParameters));
    };

    if (signedUp) {
        return (<Redirect to={"signin"} />)
    } else {
        return (
            <div id={"signup-container"}>
                <div className={classes.root} style={{marginLeft: '59.7%', marginTop: '15%', alignContent: 'center'}}>
                    <Grid container spacing={3}>
                        <Grid container item xs={12} style={{marginLeft:'15px'}}>
                            <Grid item xs={5}>
                                {errorMsg !== "" ? <input id="firstName" placeholder="first name" name={"firstName"} onChange={handleChange} value={fName}
                                                          style={{border: "1px #000000", borderRadius: "5px", outline: "none", backgroundColor: "#ff9594"}} className={classes.paper} /> :
                                    <input id="firstName" placeholder="first name" name={"firstName"} onChange={handleChange} value={fName}
                                           style={{border: "1px #000000", borderRadius: "5px", outline: "none"}} className={classes.paper} />}
                            </Grid>
                            <Grid item xs={5}>
                                {errorMsg !== "" ? <input id="lastName" placeholder="last name" name={"lastName"} onChange={handleChange} value={lName}
                                                          style={{border: "1px #000000", borderRadius: "5px", outline: "none", backgroundColor: "#ff9594"}} className={classes.paper} /> :
                                    <input id="lastName" placeholder="last name" name={"lastName"} onChange={handleChange} value={lName}
                                           style={{border: "1px #000000", borderRadius: "5px", outline: "none"}} className={classes.paper} />}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {errorMsg !== "" ? <input id="email" placeholder="email" name={"email"} onChange={handleChange} value={email}
                                                      style={{border: "1px #000000", borderRadius: "5px", outline: "none", backgroundColor: "#ff9594"}} className={classes.paper} /> :
                                <input id="email" placeholder="email" name={"email"} onChange={handleChange} value={email}
                                       style={{border: "1px #000000", borderRadius: "5px", outline: "none"}} className={classes.paper} />}
                        </Grid>
                        <Grid item xs={12}>
                            {errorMsg !== "" ? <input type={"password"} placeholder="password" id="password" name={"password"} onChange={handleChange} value={password}
                                                      style={{border: "1px #000000", borderRadius: "5px", outline: "none", backgroundColor: "#ff9594"}} className={classes.paper} /> :
                                <input type={"password"} placeholder="password" id="password" name={"password"} onChange={handleChange} value={password}
                                       style={{border: "1px #000000", borderRadius: "5px", outline: "none"}} className={classes.paper} />}
                        </Grid>
                        <Grid item xs={11} style={{marginLeft: "20.5%"}}>
                            {errorMsg !== "" ? <Link href="/#/signin" variant="body2" style={{color: "#ffffff"}}>
                                    <div className={'houshcka_demibold'} style={{marginLeft: "-38px"}}>Email is already registered. Please Sign In</div>
                                </Link> :
                                <Link href="/#/signin" variant="body2" style={{color: "#ffffff"}}>
                                    <div className={'houshcka_demibold'} style={{marginLeft: "-21px"}}>Already have an account? Sign In</div>
                                </Link>}
                            <br /><br />
                            <Button onClick={handleSubmit} disabled={fName === "" || lName === "" || email === "" || password === ""} style={{backgroundColor: "#ffffff", align: "center", paddingLeft: "50px", paddingRight: "50px", paddingTop: "10px", paddingBottom: "10px"}}>
                                <div className={'houshcka_demibold'}>sign up</div>
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
            // <Container component="main" maxWidth="xs">
            //     <CssBaseline />
            //     <div className={classes.paper}>
            //         <Avatar className={classes.avatar}>
            //             <LockOutlinedIcon />
            //         </Avatar>
            //         <Typography component="h1" variant="h5">
            //             Sign up
            //         </Typography>
            //         <form className={classes.form} >
            //             <Grid container spacing={2}>
            //                 <Grid item xs={12} sm={6}>
            //                     <TextField
            //                         autoComplete="fname"
            //                         name="firstName"
            //                         variant="outlined"
            //                         required
            //                         fullWidth
            //                         id="firstName"
            //                         label="First Name"
            //                         autoFocus
            //                         value={fName}
            //                         onChange={handleChange}
            //                     />
            //                 </Grid>
            //                 <Grid item xs={12} sm={6}>
            //                     <TextField
            //                         variant="outlined"
            //                         required
            //                         fullWidth
            //                         id="lastName"
            //                         label="Last Name"
            //                         name="lastName"
            //                         autoComplete="lname"
            //                         value={lName}
            //                         onChange={handleChange}
            //                     />
            //                 </Grid>
            //                 <Grid item xs={12}>
            //                     <TextField
            //                         variant="outlined"
            //                         required
            //                         fullWidth
            //                         id="email"
            //                         label="Email Address"
            //                         name="email"
            //                         autoComplete="email"
            //                         value={email}
            //                         onChange={handleChange}
            //                         classes={{root : classes.error_textfield}}
            //                     />
            //                     {errorMsg !== "" ? <div style={{color: "red"}}>{errorMsg}</div> : ""}
            //                 </Grid>
            //                 <Grid item xs={12}>
            //                     <TextField
            //                         variant="outlined"
            //                         required
            //                         fullWidth
            //                         name="password"
            //                         label="Password"
            //                         type="password"
            //                         id="password"
            //                         autoComplete="current-password"
            //                         value={password}
            //                         onChange={handleChange}
            //                     />
            //                 </Grid>
            //                 <Grid item xs={12}>
            //                     <FormControlLabel
            //                         control={<Checkbox value="allowExtraEmails" color="primary" onChange={(event, newValue) => setWantsPromMsg(newValue)} />}
            //                         label="I want to receive inspiration, marketing promotions and updates via email."
            //                     />
            //                 </Grid>
            //             </Grid>
            //             <Button
            //                 fullWidth
            //                 variant="contained"
            //                 color="primary"
            //                 className={classes.submit}
            //                 onClick={handleSubmit}
            //                 disabled={fName === "" || lName === "" || email === "" || password === ""}
            //             >
            //                 Sign Up
            //             </Button>
            //             <Grid container justify="flex-end">
            //                 <Grid item>
            //                     <Link href="#/signin" variant="body2">
            //                         Already have an account? Sign in
            //                     </Link>
            //                 </Grid>
            //             </Grid>
            //         </form>
            //     </div>
            //     <Box mt={5}>
            //         <Copyright />
            //     </Box>
            // </Container>
        );
    }
}