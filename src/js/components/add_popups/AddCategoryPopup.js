import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import Scrollbars from "react-scrollbars-custom";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Slide from "@material-ui/core/Slide";
import CloseIcon from '@material-ui/icons/Close';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
        marginLeft: '14.9vw',
        paddingLeft: '1.8vw',
        paddingRight: '1.8vw'
    }
}));

export default function AddCategoryPopup(props) {
    const [catName, setCatName] = React.useState("");
    const [parentID, setParentID] = React.useState(-1);
    const [parentName, setParentName] = React.useState("no parent");
    const [errorMsg, setErrorMsg] = React.useState("");
    const classes = useStyles();

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
            xhr.open('POST', 'http://localhost:3000/new_category', false);
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
            <option className={'select-options'} key={categoryID}
                    value={categoryID}>{props.mapCategories.get(categoryID).category_name}</option>
            {!props.mapSubcategories.get(categoryID) ? props.mapSubcategories.map((subCat) => {
                return (<React.Fragment><option className={'select-options'} key={subCat}
                        value={subCat}>{props.mapCategories.get(subCat).category_name}</option>
                    {generateOptions(subCat)}
                </React.Fragment>);
            }) : ""}
        </React.Fragment>)
    };

    return (
        <div>
            <Dialog
                open={props.popupOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <div id={'add-category-div'}>
                    <CloseIcon onClick={() => props.handleClose()} style={{fill: '#a65cff', width: '2vw', float: 'right', marginTop:  '1vw', marginRight: '1vw', cursor: 'pointer'}} />
                    <div className={'houshcka_demibold'} style={{fontSize: '1.1vw', marginTop: '10vw', marginLeft: '5vw'}}>name of class</div>
                    <div style={{marginTop: '.5vw'}}>
                        <input id={'new-cat-name'} className={'new-cat-inputs'} name={'cat_name'} value={catName} onChange={handleInputChange} />
                    </div>
                    <div className={'houshcka_demibold'} style={{fontSize: '1.1vw', marginTop: '3vw', marginLeft: '5vw'}}>parent class</div>
                    <select id={'parent-cat-select'} onMouseDown={handleMouseDown} onBlur={(event) => {event.target.size = 0}} className={'new-cat-inputs'} name={'parent_cat_select'} onChange={handleInputChange}>
                        <option id={-1} className={'select-options'} value={-1}>no parent</option>
                        {props.rootCategories ? props.rootCategories.map((rootID, index) => {
                            return (<React.Fragment>
                                <option className={'select-options'} style={{fontStyle: 'bold'}} key={index} value={rootID}>{props.mapCategories.get(rootID).category_name}</option>
                            </React.Fragment>);
                        }) : ""}

                    </select>
                    {errorMsg === "" ? <Button id={'submit_new_class'} className={classes.submitButton} onClick={handleSubmit}>create</Button> :
                        <div id={'add-cat-error-div'} className={'houshcka_demibold'}>{errorMsg}</div>}
                </div>
            </Dialog>
        </div>
    );
}
