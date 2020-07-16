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
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import SourcePopup from "../add_popups/SourcePopup";
import Expand from "react-expand-animated";
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';

const drawerWidth = 240;

// const Accordion = withStyles({
//     root: {
//         border: '1px solid rgba(0, 0, 0, .125)',
//         boxShadow: 'none',
//         '&:not(:last-child)': {
//             borderBottom: 0,
//         },
//         '&:before': {
//             display: 'none',
//         },
//         '&$expanded': {
//             margin: 'auto',
//         },
//     },
//     expanded: {},
// })(MuiAccordion);
//
// const AccordionSummary = withStyles({
//     root: {
//         backgroundColor: 'rgba(0, 0, 0, .03)',
//         borderBottom: '1px solid rgba(0, 0, 0, .125)',
//         marginBottom: -1,
//         minHeight: 56,
//         '&$expanded': {
//             minHeight: 56,
//         },
//     },
//     content: {
//         '&$expanded': {
//             margin: '12px 0',
//         },
//     },
//     expanded: {},
// })(MuiAccordionSummary);
//
// const AccordionDetails = withStyles((theme) => ({
//     root: {
//         padding: theme.spacing(2),
//     },
// }))(MuiAccordionDetails);

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
        // justifyContent: 'flex-end',
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

const clearIconStyle = {
    marginLeft: 6,
    marginTop: 12,
    color: '#a65cff',
    cursor: 'pointer'
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const deleteIconStyle = {
    color: '#a65cff'
};

export default function CategoryDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [indexCurrCat, setIndexCurrCat] = React.useState(0);
    const [categories, setCategories] = React.useState(props.categories);
    const [rootCategories, setRootCategories] = React.useState(props.rootCategories);
    const [mapCategories, setMapCategories] = React.useState(props.mapCategories);
    const [mapSubcategories, setMapSubcategories] = React.useState(props.mapSubcategories);
    const [openSourcePopup, setOpenSourcePopup] = React.useState(false);
    const [sourcePopup, setSourcePopup] = React.useState(null);
    const [searchValue, setSearchValue] = React.useState("");
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    const [collapseOpen2, setCollapseOpen2] = React.useState(false);
    const [currCatID, setCurrCatID] = React.useState(null);
    const [openCurrCatIDs, setOpenCurrCatIDs] = React.useState([]);
    const [currCatListHover, setCurrCatListHover] = React.useState("");
    let scrollbars = null;

    const handleOpenSourcePopup = async (source) => {
        await setSourcePopup(source);
        setOpenSourcePopup(true);
    };

    const handleCloseSourcePopup = () => {
        setOpenSourcePopup(false);
    };

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
        console.log("CURRENT CATEGORY ID");
        console.log(currCatID);
    };

    useEffect(() => {
        setCategories(props.categories);
    }, [props.categories]);

    useEffect(() => {
        setRootCategories(props.rootCategories);
        if (currCatID === null || currCatID === undefined) {
            setCurrCatID(props.rootCategories[0]);
            openCurrCatIDs.push(props.rootCategories[0])
        }
    }, [props.rootCategories]);

    useEffect(() => {
        setMapCategories(props.mapCategories);
    }, [props.mapCategories]);

    useEffect(() => {
        setMapSubcategories(props.mapSubcategories);
    }, [props.mapSubcategories]);

    const handleDeleteCat = (categoryID) => {
        const postParameters = {
            userID: props.userID,
            categoryID: categoryID
        };

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', async () => {
            if (xhr.response.startsWith("ERROR:")) {
                setErrMsg(xhr.response.substring(6));
            } else {
                props.handleDeleteCat(categoryID, openCurrCatIDs);
                setOpenCurrCatIDs(openCurrCatIDs.remove(categoryID));
            }
        });
        xhr.open('POST', 'http://localhost:3000/delete_category', false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(postParameters));
    };

    const getSubcategories = (categoryID, index) => {
        if (mapSubcategories.get(categoryID) === undefined) {
            return "";
        }
        return (<Expand open={openCurrCatIDs.includes(categoryID)}>
            {mapSubcategories.get(categoryID).map(function (subID, index) {
                const subCat = mapCategories.get(subID);
                if (subCat.category_name.toLowerCase().includes(searchValue)) {
                    return (<React.Fragment><ListItem button key={index} name={index.toString()}
                                                      style={{backgroundColor: subID === currCatID ? 'rgba(166, 92, 254, 0.29)' : '#ececec'}}
                                                      onMouseEnter={() => setCurrCatListHover(subID)}
                                                      onMouseLeave={() => setCurrCatListHover("")}
                                                      onClick={() => {
                                                          setIndexCurrCat(index);
                                                          setCurrCatID(subID);
                                                          const tempOpenIDs = [];
                                                          for (let i=0; i<openCurrCatIDs.length; i++) {
                                                              tempOpenIDs.push(openCurrCatIDs[i]);
                                                              if (mapSubcategories.get(openCurrCatIDs[i]).includes(subID)) {
                                                                  tempOpenIDs.push(subID);
                                                                  break;
                                                              }
                                                          }
                                                          setOpenCurrCatIDs(tempOpenIDs);
                                                          document.getElementById('source_scroll_div').scrollTop = 0;
                                                          props.setCurrCatIndex(index)
                                                      }}>
                        <ListItemIcon>{currCatListHover === subID ? <DeleteIcon style={deleteIconStyle} onClick={() => handleDeleteCat(subID)} /> :
                            <img alt={'folder-icon'}
                                           src={mapSubcategories.get(subID) === undefined || mapSubcategories.get(subID).length === 0 ?
                                               'src/images/subfoldericon.png' : 'src/images/parent-category-icon.png'}
                                           style={{width: 28}}/>}</ListItemIcon>
                        <div className={'category_name_drawer'}>{subCat.category_name}</div>
                    </ListItem>
                        {getSubcategories(subID, index)}
                    </React.Fragment>);
                }
            })}
            <Divider />
        </Expand>);
    };

    if (categories === undefined || mapCategories.size === 0) {
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
                        <input id={'cat-search-bar'} className={'houshcka_demibold'} value={searchValue} onChange={handleInputChange} />
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
                    <input id={'cat-search-bar'} className={'houshcka_demibold'} value={searchValue} onChange={handleInputChange} />
                    {searchValue === "" ? "" : <ClearIcon style={clearIconStyle} onClick={() => setSearchValue("")} /> }
                </div>
                <Scrollbars
                    style={{width: drawerWidth, height: '73%' }}
                    //id='source_scroll_div'
                    thumbYProps={{ className: "thumbY" }}
                    trackXProps={{ className: "trackX" }}
                >
                    <List>
                        {rootCategories.map(function (categoryID, index) {
                            const category = mapCategories.get(categoryID);
                            if (category.category_name.toLowerCase().includes(searchValue)) {
                                return (<React.Fragment><ListItem button key={index} name={index.toString()}
                                                                  style={{backgroundColor: categoryID === currCatID ? 'rgba(166, 92, 254, 0.29)' : '#ececec'}}
                                                                  onMouseEnter={() => setCurrCatListHover(categoryID)}
                                                                  onMouseLeave={() => setCurrCatListHover("")}
                                                                  onClick={() => {
                                                                      setCurrCatID(category._id);
                                                                      setOpenCurrCatIDs([category._id]);
                                                                      // setIndexCurrCat(index);
                                                                      document.getElementById('source_scroll_div').scrollTop = 0;
                                                                      props.setCurrCatIndex(index)
                                                                  }}>
                                    <ListItemIcon>{currCatListHover === categoryID ? <DeleteIcon style={deleteIconStyle} onClick={() => handleDeleteCat(categoryID)} /> :
                                        <img alt={'folder-icon'}
                                                       src={mapSubcategories.get(categoryID) === undefined || mapSubcategories.get(categoryID).length === 0 ?
                                                           'src/images/subfoldericon.png' : 'src/images/parent-category-icon.png'}
                                                       style={{width: 28}}/>}</ListItemIcon>
                                    <div className={'category_name_drawer'}>{category.category_name}</div>
                                </ListItem>
                                    {getSubcategories(categoryID, index)}
                                    {/*{mapSubcategories.get(categoryID) === undefined ? "" :*/}
                                    {/*    <Expand open={index === indexCurrCat}>*/}
                                    {/*        {mapSubcategories.get(categoryID).map(function (subID, index) {*/}
                                    {/*            const subCat = mapCategories.get(subID);*/}
                                    {/*            return (<ListItem button key={index} name={index.toString()}*/}
                                    {/*                              style={{backgroundColor: index === indexCurrCat ? 'rgba(166, 92, 254, 0.29)' : '#ececec'}}*/}
                                    {/*                              onClick={() => {*/}
                                    {/*                                  setIndexCurrCat(index);*/}
                                    {/*                                  // document.getElementById('source_scroll_div').scrollTop = 0;*/}
                                    {/*                                  props.setCurrCatIndex(index)*/}
                                    {/*                              }}>*/}
                                    {/*                <ListItemIcon><img alt={'folder-icon'}*/}
                                    {/*                                   src={'src/images/subfoldericon.png'}*/}
                                    {/*                                   style={{width: 28}}/></ListItemIcon>*/}
                                    {/*                <div className={'category_name_drawer'}>{subCat.category_name}</div>*/}
                                    {/*            </ListItem>);*/}
                                    {/*        })}*/}
                                    {/*    </Expand>*/}
                                    {/*}*/}
                                </React.Fragment>)
                            }
                        }.bind(this))}
                        {/*{categories.map(function (category, index) {*/}
                        {/*    if (category.category_name.toLowerCase().includes(searchValue)) {*/}
                        {/*        return (<React.Fragment><ListItem button key={index} name={index.toString()}*/}
                        {/*                          style={{backgroundColor: index === indexCurrCat ? 'rgba(166, 92, 254, 0.29)' : '#ececec'}}*/}
                        {/*                          onClick={() => {*/}
                        {/*                              setIndexCurrCat(index);*/}
                        {/*                              document.getElementById('source_scroll_div').scrollTop = 0;*/}
                        {/*                              props.setCurrCatIndex(index)*/}
                        {/*                          }}>*/}
                        {/*            <ListItemIcon><img alt={'folder-icon'}*/}
                        {/*                               src={'src/images/parent-category-icon.png'}*/}
                        {/*                               style={{width: 28}}/></ListItemIcon>*/}
                        {/*            <div className={'category_name_drawer'}>{category.category_name}</div>*/}
                        {/*            /!*<Expand open={collapseOpen2}>*!/*/}
                        {/*            /!*    <div style={{backgroundColor: 'blue'}}>*!/*/}
                        {/*            /!*        Hello*!/*/}
                        {/*            /!*    </div>*!/*/}
                        {/*            /!*</Expand>*!/*/}
                        {/*        </ListItem>*/}
                        {/*            <Expand open={index === indexCurrCat}>*/}
                        {/*                <ListItem button key={index} name={index.toString()}*/}
                        {/*                          style={{backgroundColor: index === indexCurrCat ? 'rgba(166, 92, 254, 0.29)' : '#ececec'}}*/}
                        {/*                          onClick={() => {*/}
                        {/*                              setIndexCurrCat(index);*/}
                        {/*                              document.getElementById('source_scroll_div').scrollTop = 0;*/}
                        {/*                              props.setCurrCatIndex(index)*/}
                        {/*                          }}>*/}
                        {/*                    <ListItemIcon><img alt={'folder-icon'}*/}
                        {/*                                       src={'src/images/parent-category-icon.png'}*/}
                        {/*                                       style={{width: 28}}/></ListItemIcon>*/}
                        {/*                    <div className={'category_name_drawer'}>{category.category_name}</div>*/}
                        {/*                    /!*<Expand open={collapseOpen2}>*!/*/}
                        {/*                    /!*    <div style={{backgroundColor: 'blue'}}>*!/*/}
                        {/*                    /!*        Hello*!/*/}
                        {/*                    /!*    </div>*!/*/}
                        {/*                    /!*</Expand>*!/*/}
                        {/*                </ListItem>*/}
                        {/*    </Expand></React.Fragment>)*/}
                        {/*        // if (index === indexCurrCat) {*/}
                        {/*        //     return (<ListItem button key={index} name={index.toString()}*/}
                        {/*        //                       style={{backgroundColor: index === indexCurrCat ? 'rgba(166, 92, 254, 0.29)' : '#ececec'}}*/}
                        {/*        //                       onClick={() => {*/}
                        {/*        //                           setIndexCurrCat(index);*/}
                        {/*        //                           document.getElementById('source_scroll_div').scrollTop = 0;*/}
                        {/*        //                           props.setCurrCatIndex(index)*/}
                        {/*        //                       }}>*/}
                        {/*        //         <ListItemIcon><img alt={'folder-icon'}*/}
                        {/*        //                            src={'src/images/parent-category-icon.png'}*/}
                        {/*        //                            style={{width: 28}}/></ListItemIcon>*/}
                        {/*        //         <div className={'category_name_drawer'}>{category.category_name}</div>*/}
                        {/*        //     </ListItem>)*/}
                        {/*        // } else {*/}
                        {/*        //     return (<ListItem button key={index} name={index.toString()}*/}
                        {/*        //                       onClick={() => {*/}
                        {/*        //                           setIndexCurrCat(index);*/}
                        {/*        //                           document.getElementById('source_scroll_div').scrollTop = 0;*/}
                        {/*        //                           props.setCurrCatIndex(index);*/}
                        {/*        //                       }}>*/}
                        {/*        //         <ListItemIcon><img alt={'folder-icon'}*/}
                        {/*        //                            src={'src/images/parent-category-icon.png'}*/}
                        {/*        //                            style={{width: 28}}/></ListItemIcon>*/}
                        {/*        //         <div className={'category_name_drawer'}>{category.category_name}</div>*/}
                        {/*        //     </ListItem>)*/}
                        {/*        // }*/}
                        {/*    }*/}
                        {/*}.bind(this))}*/}
                    </List>
                </Scrollbars>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: props.drawerOpen,
                })}
            >
                <div className={'category_name_title'}>{rootCategories.length > 0 ? mapCategories.get(currCatID).category_name : "No Categories"}</div>
                <Scrollbars
                    style={{ marginLeft: '-10vh', height: '70vh', marginTop: '5vh' }}
                    id='source_scroll_div'
                    ref={ref => (scrollbars = ref)}
                    thumbYProps={{ className: "thumbY" }}
                    trackXProps={{ className: "trackX" }}
                >
                    {rootCategories.length > 0 && mapCategories.get(currCatID).sources.length !== 0 ? mapCategories.get(currCatID).sources.map((source, index) => (
                        <SourceCard key={index} source={source} drawerOpen={props.drawerOpen} openSourcePopup={() => handleOpenSourcePopup(source)} />
                    )) : "No sources"}
                </Scrollbars>
            </main>
            <Dialog
                open={openSourcePopup}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseSourcePopup}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth={false}
            >
                {props.categories[indexCurrCat] === undefined ? <SourcePopup source={sourcePopup} handleClose={handleCloseSourcePopup} /> :
                    <SourcePopup userID={props.userID} categoryID={mapCategories.get(currCatID)._id} handleEditSource={props.handleEditSource}
                                 categoryName={mapCategories.get(currCatID).category_name} source={sourcePopup} handleClose={handleCloseSourcePopup} />}
            </Dialog>
        </div>
    );
}
