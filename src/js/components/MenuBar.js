import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Redirect} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '98.75%',
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#3D3C3C',
    }
}));


export default function MenuAppBar(props) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [clickedProfile, setClickedProfile] = React.useState(false);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfileMenuItem = () => {
        setClickedProfile(true);
    };

    const handleLogoutMenuItem = () => {
        props.logOut();
    };

    if (clickedProfile) {
        console.log("IN RETURN FOR REDIRECT");
        return (<Redirect to={"profile"} />);
    }

    return (
        <div className={classes.root}>
            <div position="static" className={classes.appBar} border={0}>
                <Toolbar>
                    {/*<img src={logo} alt={"Logo"} className={"smallLogo"} onClick={() => history2.push("/")}/>*/}
                    <Typography variant="h6" className={classes.title}>
                        Arma
                    </Typography>
                    {auth && (
                        <div>
                            <Tooltip title={props.userName} aria-label="add">
                                <AccountCircleIcon style={{cursor: 'pointer'}} onClick={handleMenu}/>
                                {/*<Avatar style={{cursor: 'pointer'}} src={auth2.getImage()} onClick={handleMenu}/>*/}
                            </Tooltip>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem value={"profile"} onClick={handleProfileMenuItem}>
                                    Profile
                                </MenuItem>
                                <MenuItem value={"logout"} onClick={handleLogoutMenuItem} >Logout</MenuItem>
                            </Menu>

                        </div>
                    )}
                </Toolbar>
            </div>
        </div>
    );
}
