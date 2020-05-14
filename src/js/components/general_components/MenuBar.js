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
        color: '#ffffff'
    },
    appBar: {
        backgroundColor: '#0c0018',
    }
}));


export default function MenuAppBar(props) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [clickedHome, setClickedHome] = React.useState(false);

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

    const handleAddClicked = () => {

    };

    const basicMenuBar = ( <div className={classes.root}>
        <div position="static" className={classes.appBar} border={0}>
            <Toolbar>
                {/*<img src={logo} alt={"Logo"} className={"smallLogo"} onClick={() => history2.push("/")}/>*/}
                <Typography variant="h6" className={classes.title} style={{cursor: 'pointer'}} onClick={handleClickHome}>
                    Arma
                </Typography>
                {auth && (
                    <div>
                        <Tooltip title={props.userName} aria-label="add">
                            <AccountCircleIcon style={{cursor: 'pointer', fill: '#ffffff'}} onClick={handleMenu}/>
                            {/*<Avatar style={{cursor: 'pointer'}} src={auth2.getImage()} onClick={handleMenu}/>*/}
                        </Tooltip>
                    </div>
                )}
            </Toolbar>
        </div>
    </div>);

    const homeMenuBar = (<div className={classes.root}>
        <div position="static" className={classes.appBar} border={0}>
            <Toolbar>
                {/*<img src={logo} alt={"Logo"} className={"smallLogo"} onClick={() => history2.push("/")}/>*/}
                <Typography variant="h6" className={classes.title} style={{cursor: 'pointer'}} onClick={handleClickHome}>
                    Arma
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
    </div>);

    if (clickedHome && props.componentIn === "profile") {
        return (<React.Fragment><Redirect to={"/home"} />{homeMenuBar}</React.Fragment>);
    } else if (props.componentIn === "home") {
        return homeMenuBar;
    } else {
        return basicMenuBar;
    }
}
