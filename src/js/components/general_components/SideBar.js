import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Redirect} from "react-router-dom";
import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function SideBar(props) {
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [clickedProfile, setClickedProfile] = React.useState(false);

    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(!openDrawer);
    };

    const handleClickProfile = () => {
        setClickedProfile(true);
    };

    const handleClickCategory = (index) => {
        console.log(index);
        props.toggleDrawerOpen();
        props.changeCategoryDisplay(index);
    };

    const list = () => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
        >
            <List>
                <ListItem button key={"Profile"} onClick={handleClickProfile}>
                    <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                    <ListItemText primary={"Profile"} />
                </ListItem>
                <ListItem button key={"Logout"} onClick={props.logOut}>
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText primary={"Logout"} />
                </ListItem>
            </List>
            <Divider />
            <List>
                {props.categories.map((category, index) => (
                    <ListItem button key={index} onClick={() => handleClickCategory(index)}>
                        <ListItemIcon><FolderIcon /></ListItemIcon>
                        <ListItemText primary={category.category_name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const basicSideBar = (<div>
        <React.Fragment>
            <Drawer anchor={"right"} open={props.drawerOpen} onClose={props.toggleDrawerOpen}>
                {list()}
            </Drawer>
        </React.Fragment>
    </div>);

    if (clickedProfile) {
        return (<React.Fragment><Redirect to={"/profile"} />{basicSideBar}</React.Fragment>);
    }

    return (basicSideBar);
}
