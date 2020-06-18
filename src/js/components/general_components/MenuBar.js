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
import AddIcon from '@material-ui/icons/Add';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import {Redirect} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: '#ffffff'
    },
    appBar: {
        backgroundColor: '#a65cff',
    },
    popperButtons: {
        fontFamily: 'houschka-rounded,sans-serif',
        fontWeight: 600,
        fontStyle: 'normal',
        fontSize: '1.2vw',
        textTransform: 'none',
        color: 'white',
        marginLeft: '.8vw',
        marginTop: '-3px',
        maxWidth: '2vw',
        paddingLeft: '0vw'
    }
}));


export default function MenuAppBar(props) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [clickedHome, setClickedHome] = React.useState(false);
    const [goToProfile, setGoToProfile] = React.useState(false);
    const [openPopper, setOpenPopper] = React.useState(false);

    const handleClickHome = () => {
        setClickedHome(true);
    };

    const handleMenu = () => {
        props.toggleDrawerOpen();
    };

    const handleOpenCategoryDialog = () => {
        props.handleOpenDialog("newCategory", null, null);
    };

    const handleOpenSourceDialog = () => {
        props.handleOpenDialog("newSource", "", "");
    };

    const handleGoToProfile = () => {
        setGoToProfile(true);
    };

    const handleClickLogout = () => {
        setOpenPopper(!openPopper);
    };

    const basicMenuBar = (
        <div className={classes.root}>
            <div position="static" className={classes.appBar} border={0}>
                <Toolbar>
                    <IconButton>
                        <img src={"src/images/c-logo.png"} style={{width: '35px', height: '35px'}} alt={"Logo"} className={"smallLogo"} onClick={() => console.log("clicked logo in app bar")}/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title} style={{cursor: 'pointer'}} onClick={handleClickHome}>
                        <img src={"src/images/clasifywhite.png"} style={{width: '90px', height: '30px', marginTop: '1%'}} alt={"clasify-white"} />
                    </Typography>
                    {auth && (
                        <div>
                            <Tooltip title={"My Profile"} aria-label="add">
                                <AccountCircleIcon style={{cursor: 'pointer', fill: '#ffffff', marginRight: '2vh'}} onClick={handleGoToProfile} />
                            </Tooltip>
                            <Tooltip title={"Logout"}>
                                <ExitToAppIcon style={{cursor: 'pointer', fill: '#ffffff'}} onClick={handleClickLogout} />
                            </Tooltip>
                        </div>
                    )}
                </Toolbar>
                <Popper id={'logout-popper'} open={openPopper} placement={'bottom-end'} transition>
                    {({ TransitionProps }) => (
                        <Slide direction="left" {...TransitionProps} timeout={350}>
                            <div id={'logout-popper-div'}>
                                <div style={{float: 'left', marginLeft: '24vw', marginTop: '1px'}}>Are you sure you want to logout?</div>
                                <div className={'logout-popper-response'} style={{marginRight: '2vw'}} onClick={() => setOpenPopper(false)}>no</div>
                                <div className={'logout-popper-response'} style={{marginRight: '.8vw'}} onClick={() => props.logout()}>yes</div>
                            </div>
                        </Slide>
                    )}
                </Popper>
            </div>
        </div>
    );

    const homeMenuBar = (<React.Fragment>
        <div className={classes.root}>
            <div position="static" className={classes.appBar} border={0}>
                <Toolbar>
                    {/*<img src={logo} alt={"Logo"} className={"smallLogo"} onClick={() => history2.push("/")}/>*/}
                    <Typography variant="h6" className={classes.title} style={{cursor: 'pointer'}} onClick={handleClickHome}>
                        Clasify
                    </Typography>
                    {auth && (
                        <div style={{display: 'flex'}}>
                            <Tooltip title={"Add Source"} aria-label="add">
                                <AddIcon style={{cursor: 'pointer', fill: '#ffffff'}} onClick={handleOpenSourceDialog}/>
                                {/*<Avatar style={{cursor: 'pointer'}} src={auth2.getImage()} onClick={handleMenu}/>*/}
                            </Tooltip>
                            {"____"}
                            <Tooltip title={"Add Category"} aria-label="add">
                                <CreateNewFolderIcon style={{cursor: 'pointer', fill: '#ffffff'}} value={"newCategory"} onClick={handleOpenCategoryDialog}/>
                                {/*<Avatar style={{cursor: 'pointer'}} src={auth2.getImage()} onClick={handleMenu}/>*/}
                            </Tooltip>
                            {"____"}
                            <Tooltip title={props.userName} aria-label="add">
                                <AccountCircleIcon style={{cursor: 'pointer', fill: '#ffffff'}} value={"newSource"} onClick={handleMenu}/>
                                {/*<Avatar style={{cursor: 'pointer'}} src={auth2.getImage()} onClick={handleMenu}/>*/}
                            </Tooltip>
                        </div>
                    )}
                </Toolbar>
            </div>
        </div>
        <Popper id={'logout-popper'} open={openPopper} transition>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <div>The content of the Popper.</div>
                </Fade>
            )}
        </Popper>
    </React.Fragment>);
    if (goToProfile) {
        return (<Redirect to={{
            pathname: 'profile',
            state: { categories: props.categories }
        }} />);
    } else {
        return basicMenuBar;
    }
}
