import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import * as constants from "../../constants.js";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SourceCard from "../source_components/SourceCard";
import Scrollbars from "react-scrollbars-custom";
import SourcePopup from "../add_popups/SourcePopup";
import Expand from "react-expand-animated";
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteClassPopup from "../add_popups/DeleteClassPopup";
import DeleteSourcePopup from "../add_popups/DeleteSourcePopup";
import CreateIcon from '@material-ui/icons/Create';
import EditCategoryPopup from "../add_popups/EditCategoryPopup";
import LockIcon from '@material-ui/icons/Lock';
import SearchIcon from '@material-ui/icons/Search';

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
    deleteIconStyle: {
        color: '#a65cff',
        '&:hover': {
            color: 'rgba(166,92,254,0.42)'
        },
        marginLeft: -6
    },
    editIconStyle: {
        color: '#a65cff',
        '&:hover': {
            color: 'rgba(166,92,254,0.42)'
        }
    }
}));

const clearIconStyle = {
    marginLeft: 6,
    marginTop: 12,
    color: '#a65cff',
    cursor: 'pointer'
};

const clearIconSourceStyle = {
    // marginLeft: -3,
    marginTop: 3.4,
    float: 'right',
    color: '#a65cff',
    cursor: 'pointer',
    display: 'inline-block',
};

export default function CategoryDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [indexCurrCat, setIndexCurrCat] = React.useState(0);
    const [rootCategories, setRootCategories] = React.useState(props.rootCategories);
    const [mapCategories, setMapCategories] = React.useState(props.mapCategories);
    const [mapSubcategories, setMapSubcategories] = React.useState(props.mapSubcategories);
    const [openSourcePopup, setOpenSourcePopup] = React.useState(false);
    const [sourcePopup, setSourcePopup] = React.useState(null);
    const [searchValue, setSearchValue] = React.useState("");
    const [currCatID, setCurrCatID] = React.useState(props.rootCategories === undefined || props.rootCategories[0] === undefined ? null : props.rootCategories[0]._id);
    const [openCurrCatIDs, setOpenCurrCatIDs] = React.useState([]);
    const [currCatListHover, setCurrCatListHover] = React.useState("");
    const [deleteClassOpen, setDeleteClassOpen] = React.useState(false);
    const [deleteClass, setDeleteClass] = React.useState(undefined);
    const [deleteSource, setDeleteSource] = React.useState(null);
    const [editClassID, setEditClassID] = React.useState(undefined);
    const [editCatOpen, setEditCatOpen] = React.useState(false);
    const [sourceSearchValue, setSourceSearchValue] = React.useState("");

    let scrollbars = null;

    const handleOpenSourcePopup = async (source) => {
        await setSourcePopup(source);
        setOpenSourcePopup(true);
    };

    const handleCloseSourcePopup = () => {
        setOpenSourcePopup(false);
    };

    const handleInputChange = (event) => {
        if (event.target.name === 'source-search') {
            setSourceSearchValue(event.target.value.toLowerCase());
        } else {
            setSearchValue(event.target.value);
        }
    };

    useEffect(() => {
        setRootCategories(props.rootCategories);
        if (currCatID === null || currCatID === undefined) {
            setCurrCatID(props.rootCategories[0]);
            props.setCurrCatID(props.rootCategories[0]);
            openCurrCatIDs.push(props.rootCategories[0])
        }
    }, [props.rootCategories]);

    useEffect(() => {
        setMapCategories(props.mapCategories);
    }, [props.mapCategories]);

    useEffect(() => {
        setMapSubcategories(props.mapSubcategories);
    }, [props.mapSubcategories]);

    const generateCatSearchName = (categoryID) => {
        if (mapCategories.get(categoryID) === undefined) {
            return "";
        }
        let output = mapCategories.get(categoryID).category_name.toLowerCase();
        if (mapSubcategories.get(categoryID)) {
            for (let i=0; i<mapSubcategories.get(categoryID).length; i++) {
                output += generateCatSearchName(mapSubcategories.get(categoryID)[i]);
            }
        }
        return output;
    };

    const generateSourceSearchName = (source) => {
        return (source.source_name + " " + source.source_notes).toLowerCase();
    };

    const handleClickDelete = (categoryID, event) => {
        event.stopPropagation();
        setDeleteClass(mapCategories.get(categoryID));
        setDeleteClassOpen(true);
    };

    const handleClickEdit = (categoryID, event) => {
        event.stopPropagation();
        setEditClassID(categoryID);
        setEditCatOpen(true);
    };

    const handleDeleteSourceClose = () => {
        setDeleteSource(null);
    };

    const handleDeleteCatClose = () => {
        setDeleteClass(undefined);
        setDeleteClassOpen(false);
    };

    const handleDeleteCat = (categoryID) => {
        const postParameters = {
            userID: props.userID,
            categoryID: categoryID
        };

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load',  () => {
            console.log("IN HANDLE DELETE CLASS");
            console.log(categoryID);
            if (xhr.response === 'success') {
                const indexCat = openCurrCatIDs.indexOf(categoryID);
                if (indexCat !== -1) {
                    openCurrCatIDs.splice(indexCat, 1);
                }
                if (currCatID === categoryID) {
                    const parentID = mapCategories.get(categoryID).parent_id;
                    if (parentID === '-1') {
                        if (props.rootCategories.length === 0) {
                            setCurrCatID(null);
                            props.setCurrCatID(null);
                        } else {
                            setCurrCatID(props.rootCategories[0]);
                            props.setCurrCatID(props.rootCategories[0]);
                        }
                    } else {
                        setCurrCatID(parentID);
                        props.setCurrCatID(parentID);
                    }
                }
                handleDeleteCatClose();
                props.handleDeleteCat(categoryID);
            }
        });
        // xhr.open('POST', 'http://localhost:3000/delete_category', false);
        xhr.open('POST', constants.HOST_NAME + 'delete_category', false);
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
                if (generateCatSearchName(subID).includes(searchValue)) {
                    return (<React.Fragment><ListItem button key={index} name={index.toString()}
                                                      style={{backgroundColor: subID === currCatID ? 'rgba(166, 92, 254, 0.29)' : '#ececec'}}
                                                      onMouseEnter={() => setCurrCatListHover(subID)}
                                                      onMouseLeave={() => setCurrCatListHover("")}
                                                      onClick={() => {
                                                          setIndexCurrCat(index);
                                                          setCurrCatID(subID);
                                                          props.setCurrCatID(subID);
                                                          const tempOpenIDs = [];
                                                          for (let i=0; i<openCurrCatIDs.length; i++) {
                                                              tempOpenIDs.push(openCurrCatIDs[i]);
                                                              const tempSubcats = mapSubcategories.get(openCurrCatIDs[i]);
                                                              if (tempSubcats !== undefined && tempSubcats.includes(subID)) {
                                                                  tempOpenIDs.push(subID);
                                                                  break;
                                                              }
                                                          }
                                                          setOpenCurrCatIDs(tempOpenIDs);
                                                          document.getElementById('source_scroll_div').scrollTop = 0;
                                                      }}>
                        <ListItemIcon>{currCatListHover === subID ? <React.Fragment>
                                <DeleteIcon className={classes.deleteIconStyle} onClick={(event) => handleClickDelete(subID, event)} />
                                <CreateIcon className={classes.editIconStyle} onClick={(event) => handleClickEdit(subID, event)} />
                        </React.Fragment> :
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

    if (rootCategories === undefined || mapCategories === undefined || mapSubcategories === undefined) {
        console.log("THIS IS ROOT CATEGORIES");
        console.log(rootCategories);
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
    } else {
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
                                if (generateCatSearchName(categoryID).includes(searchValue)) {
                                    return (<React.Fragment><ListItem button key={index} name={index.toString()}
                                                                      style={{backgroundColor: categoryID === currCatID ? 'rgba(166, 92, 254, 0.29)' : '#ececec'}}
                                                                      onMouseEnter={() => setCurrCatListHover(categoryID)}
                                                                      onMouseLeave={() => setCurrCatListHover("")}
                                                                      onClick={() => {
                                                                          setCurrCatID(category._id);
                                                                          props.setCurrCatID(category._id);
                                                                          setOpenCurrCatIDs([category._id]);
                                                                          // setIndexCurrCat(index);
                                                                          document.getElementById('source_scroll_div').scrollTop = 0;
                                                                      }}>
                                        <ListItemIcon>{currCatListHover === categoryID ? <React.Fragment>
                                                <DeleteIcon className={classes.deleteIconStyle} onClick={(event) => handleClickDelete(categoryID, event)} />
                                                <CreateIcon className={classes.editIconStyle} onClick={(event) => handleClickEdit(categoryID, event)} />
                                        </React.Fragment> :
                                            <img alt={'folder-icon'}
                                                 src={mapSubcategories.get(categoryID) === undefined || mapSubcategories.get(categoryID).length === 0 ?
                                                     'src/images/subfoldericon.png' : 'src/images/parent-category-icon.png'}
                                                 style={{width: 28}}/>}</ListItemIcon>
                                        <div className={'category_name_drawer'}>{category.category_name}</div>
                                    </ListItem>
                                        <Divider />
                                        {getSubcategories(categoryID, index)}
                                    </React.Fragment>)
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
                    <div className={'category_name_title'}>
                        {rootCategories.length > 0 && mapCategories.get(currCatID) !== undefined ? !mapCategories.get(currCatID).isPublic ?
                            <React.Fragment><LockIcon /> {mapCategories.get(currCatID).category_name}</React.Fragment> : mapCategories.get(currCatID).category_name
                            : "No Classes"}
                    </div>
                    {rootCategories.length > 0 && mapCategories.get(currCatID) && mapCategories.get(currCatID).sources.length > 0 ?
                        <div id={'category-search-bar-div'}>
                            <input id={'source-search-bar'} name={'source-search'} value={sourceSearchValue} onChange={handleInputChange} className={'houshcka_demibold'} />
                            {sourceSearchValue === "" ? "" : <ClearIcon style={clearIconSourceStyle} onClick={() => setSourceSearchValue("")} /> }
                        </div> : ""}

                    <Scrollbars
                        style={{ marginLeft: '-10vh', height: '70vh', marginTop: '5vh' }}
                        id='source_scroll_div'
                        ref={ref => (scrollbars = ref)}
                        thumbYProps={{ className: "thumbY" }}
                        trackXProps={{ className: "trackX" }}
                    >
                        {rootCategories.length > 0 && mapCategories.get(currCatID) !== undefined &&
                        mapCategories.get(currCatID).sources.length !== 0 ? mapCategories.get(currCatID).sources.map(function (source, index) {
                            if (sourceSearchValue === "" || generateSourceSearchName(source).includes(sourceSearchValue)) {
                                return (<SourceCard key={index} source={source} drawerOpen={props.drawerOpen} openSourcePopup={() => handleOpenSourcePopup(source)}
                                            changeDeleteSource={(source) => setDeleteSource(source)} />)
                            }
                        }) : <div id={'no-sources-icon-div'}><img id={'no-sources-icon'} src={'src/images/no-sources.png'} alt={'no sources'}/></div>}
                    </Scrollbars>
                </main>
                {mapCategories.get(currCatID) === undefined ? <SourcePopup source={sourcePopup} handleClose={handleCloseSourcePopup} popupOpen={false} /> :
                    <SourcePopup userID={props.userID} categoryID={mapCategories.get(currCatID) === undefined ? "" : mapCategories.get(currCatID)._id}
                                 handleEditSource={props.handleEditSource} categoryName={mapCategories.get(currCatID) === undefined ? "" : mapCategories.get(currCatID).category_name} source={sourcePopup} handleClose={handleCloseSourcePopup}
                                 popupOpen={openSourcePopup}/>}
                <DeleteClassPopup popupOpen={deleteClassOpen} category={deleteClass} handleDelete={handleDeleteCat}
                    handleClose={handleDeleteCatClose} />
                <DeleteSourcePopup userID={props.userID} popupOpen={deleteSource !== null} source={deleteSource} handleClose={handleDeleteSourceClose} categoryID={currCatID}
                    categoryName={!mapCategories || !mapCategories.get(currCatID) ? "" : mapCategories.get(currCatID).category_name} handleDeleteSource={props.handleDeleteSource}/>
                <EditCategoryPopup userID={props.userID} popupOpen={editCatOpen} handleClose={() => setEditCatOpen(false)}
                                   mapCategories={props.mapCategories} rootCategories={props.rootCategories} mapSubcategories={props.mapSubcategories}
                                   editClass={props.editClass} editClassID={editClassID}/>
            </div>
        );
    }
}
