import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from "@material-ui/icons/Folder";
import SourceCard from "../source_components/SourceCard";
import Scrollbars from "react-scrollbars-custom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        top: '18vh',
        borderRadius: 6,
        backgroundColor: '#ececec'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        marginTop: '-1.15vh',
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function CategoryDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [indexCurrCat, setIndexCurrCat] = React.useState(0);
    const [categories, setCategories] = React.useState(props.categories);
    let scrollbars = null;

    useEffect(() => {
        console.log("IN USE EFFECT FOR CATEGORY DRAWER");
        setCategories(props.categories);
    }, [props.categories]);

    if (categories === undefined) {
        return (
            <div className={classes.root}>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={props.drawerOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={() => console.log("yay i clicked an unnecessary button")}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <List/>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: props.drawerOpen,
                    })}
                >
                    <div className={'category_name_title'}>Loading Categories</div>
                    <img src={'src/images/loadingclasifygif.gif'} alt={'c loading gif'} style={{width: '10vw', marginLeft: '26.4vw', marginTop: '5vw'}} />
                </main>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={props.drawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={() => console.log("yay i clicked an unnecessary button")}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Scrollbars
                    style={{width: drawerWidth, height: '73%' }}
                    //id='source_scroll_div'
                    thumbYProps={{ className: "thumbY" }}
                    trackXProps={{ className: "trackX" }}
                >
                    <List>
                        {categories.map(function (category, index) {
                            if (index === indexCurrCat) {
                                return (<ListItem button key={index} name={index.toString()} style={{backgroundColor: 'rgba(166, 92, 254, 0.29)'}}
                                                  onClick={() => {setIndexCurrCat(index);
                                                  document.getElementById('source_scroll_div').scrollTop =0;
                                                  props.setCurrCatIndex(index)}}>
                                    <ListItemIcon><FolderIcon /></ListItemIcon>
                                    <div className={'category_name_drawer'}>{category.category_name}</div>
                                </ListItem>)
                            } else {
                                return (<ListItem button key={index} name={index.toString()}
                                                  onClick={() => {setIndexCurrCat(index);
                                                  document.getElementById('source_scroll_div').scrollTop =0;
                                                  props.setCurrCatIndex(index);}}>
                                    <ListItemIcon><FolderIcon /></ListItemIcon>
                                    <div className={'category_name_drawer'}>{category.category_name}</div>
                                </ListItem>)
                            }
                        }.bind(this))}
                    </List>
                </Scrollbars>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: props.drawerOpen,
                })}
            >
                <div className={'category_name_title'}>{props.categories.length > 0 ? props.categories[indexCurrCat].category_name : "No Categories"}</div>
                <Scrollbars
                    style={{ marginLeft: '-10vh', height: '70vh', marginTop: '5vh' }}
                    id='source_scroll_div'
                    ref={ref => (scrollbars = ref)}
                    thumbYProps={{ className: "thumbY" }}
                    trackXProps={{ className: "trackX" }}
                >
                    {categories.length > 0 ? props.categories[indexCurrCat].sources.map((source, index) => (
                        <SourceCard key={index} source={source} drawerOpen={props.drawerOpen} />
                    )) : "No sources"}
                </Scrollbars>
            </main>
        </div>
    );
}
