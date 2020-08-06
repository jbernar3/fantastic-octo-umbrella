import React, {useEffect} from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Slide from "@material-ui/core/Slide";
import CloseIcon from '@material-ui/icons/Close';
import * as constants from "../../constants.js";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    textInput: {
        outline: 'none',
        borderRadius: '7px',
        backgroundColor: 'rgba(167,93,255,0.15)',
        borderStyle: 'solid'
    },
    outlinedRoot: {
        fontFamily: 'houschka-rounded,sans-serif',
        fontWeight: 500,
        fontStyle: 'normal',
        fontSize: '13pt',
        color: '#a65cff',
        paddingTop: '2px',
        paddingBottom: '2px',
        borderColor: '#ffffff',
        borderWidth: '1px',
        '&:hover $notchedOutline': {
            borderColor: '#a65cff',
            borderWidth: '1px'
        },
        '&$focused $notchedOutline': {
            borderColor: '#a65cff',
            borderWidth: '3px',
        },
    },
    outlinedRootShort: {
        fontFamily: 'houschka-rounded,sans-serif',
        fontWeight: 600,
        fontStyle: 'normal',
        fontSize: '13pt',
        color: '#a65cff',
        paddingTop: '2px',
        paddingBottom: '2px',
        borderColor: '#ffffff',
        borderWidth: '1px',
        height: '50px',
        '&:hover $notchedOutline': {
            borderColor: '#a65cff',
            borderWidth: '1px'
        },
        '&$focused $notchedOutline': {
            borderColor: '#a65cff',
            borderWidth: '3px',
        },
    },
    notchedOutline: {},
    focused: {},
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    selectInput: {
        backgroundColor: 'rgba(166, 92, 254, 0.09)',
        outline: 'none',
        borderRadius: '7px',
        border: 'none',
        fontFamily: 'houschka-rounded,sans-serif',
        fontWeight: 500,
        fontStyle: 'normal',
        fontSize: '15pt',
        color: '#a65cff',
        marginLeft: '68px',
        paddingLeft: '5px',
        width: '354px'
    },
    submitButton: {
        backgroundColor: 'rgba(166, 92, 254, 0.09)',
        borderRadius: '7px',
        border: 'none',
        fontFamily: 'houschka-rounded,sans-serif',
        fontWeight: 700,
        fontStyle: 'normal',
        fontSize: '1.3vw',
        color: '#a65cff',
        textTransform: 'none',
        marginTop: '4vw',
        marginLeft: '15.5vw',
        paddingLeft: '1.8vw',
        paddingRight: '1.8vw'
    }
}));

export default function EditCategoryPopup(props) {
    const [catName, setCatName] = React.useState(null);
    const [parentID, setParentID] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState("");
    const classes = useStyles();

    useEffect(() => {
        if (props.editClassID && props.mapCategories && catName === null && parentID === null) {
            setCatName(props.mapCategories.get(props.editClassID).category_name);
            setParentID(props.mapCategories.get(props.editClassID).parent_id);
        }
    }, [props.editClassID]);

    const handleInputChange = (event) => {
        const eventName = event.target.name;
        const eventValue = event.target.value;
        setErrorMsg("");
        if (eventName === 'cat_name') {
            if (eventValue.length <= 20) {
                setCatName(eventValue);
            }
        } else {
            setParentID(eventValue);
            setParentName(eventName);
            event.target.blur();
        }
    };


    const handleSubmit = () => {
        if (catName === "") {
            setErrorMsg("category is name empty");
        } else {
            console.log("PARENT ID IN HANDLE SUBMIT of ADD CAT");
            console.log(parentID);
            const postParameters = {
                userID: props.userID,
                catName: catName,
                parentID: parentID
            };

            const xhr = new XMLHttpRequest();
            xhr.addEventListener('load', () => {
                if (xhr.response.startsWith("ERROR:")) {
                    setErrorMsg(xhr.response.substring(6));
                } else {
                    setCatName("");
                    props.addNewCategory(JSON.parse(xhr.response), parentID);
                }
            });
            // xhr.open('POST', 'http://localhost:3000/new_category', false);
            xhr.open('POST', constants.HOST_NAME + 'new_category', false);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(postParameters));
        }
    };

    const handleMouseDown = (event) => {
        if (event.target.options.length>6) {
            event.target.size = 6;
        }
    };

    const generateOptions = (categoryID) => {
        if (!props.mapCategories.get(categoryID) === undefined) {
            return "";
        }
        return (<React.Fragment>
            {props.mapSubcategories.get(categoryID) ? props.mapSubcategories.get(categoryID).map((subCat) => {
                return (<React.Fragment><option className={'select-options'} key={subCat}
                                                value={subCat}>{props.mapCategories.get(subCat).category_name}</option>
                    {generateOptions(subCat)}
                </React.Fragment>);
            }) : ""}
        </React.Fragment>)
    };

    const handleClose = () => {
        setCatName(null);
        setParentID(null);
        props.handleClose();
    };

    return (
        <div>
            <Dialog
                open={props.popupOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <div id={'edit-category-div'}>
                    <CloseIcon onClick={handleClose} style={{fill: '#a65cff', width: '2vw', float: 'right', marginTop:  '1vw', marginRight: '1vw', cursor: 'pointer'}} />
                    <div id={'edit-class-title'} className={'houshcka_demibold'}>
                        edit {props.editClassID && props.mapCategories ? <div id={'delete-category-msg-inner'}>{props.mapCategories.get(props.editClassID).category_name}</div> : ""}
                    </div>
                    <div className={'houshcka_demibold'} style={{fontSize: '1.1vw', marginTop: '7vw', marginLeft: '5vw'}}>new name</div>
                    <div style={{marginTop: '.5vw'}}>
                        <input id={'new-cat-name'} className={'new-cat-inputs'} name={'cat_name'} value={catName} onChange={handleInputChange} />
                    </div>
                    <div className={'houshcka_demibold'} style={{fontSize: '1.1vw', marginTop: '3vw', marginLeft: '5vw'}}>new parent class</div>
                    <select id={'parent-cat-select'} onMouseDown={handleMouseDown} onBlur={(event) => {event.target.size = 0}} className={'new-cat-inputs'} name={'parent_cat_select'} onChange={handleInputChange}>
                        <option id={-1} className={'select-options'} value={-1}>no parent</option>
                        {props.rootCategories ? props.rootCategories.map((rootID, index) => {
                            return (<React.Fragment>
                                <option className={'select-options'} key={rootID}
                                        value={rootID}>{props.mapCategories.get(rootID).category_name}</option>
                                {generateOptions(rootID)}
                            </React.Fragment>);
                        }) : ""}

                    </select>
                    {errorMsg === "" ? <Button id={'submit_new_class'} className={classes.submitButton} onClick={handleSubmit}>save</Button> :
                        <div id={'add-cat-error-div'} className={'houshcka_demibold'}>{errorMsg}</div>}
                </div>
            </Dialog>
        </div>
    );
}
