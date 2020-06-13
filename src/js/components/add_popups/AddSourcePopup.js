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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
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
}));

export default function AddSourcePopup(props) {
    const [sourceTitle, setSourceTitle] = React.useState("");
    const [sourceUrl, setSourceUrl] = React.useState("");
    const [sourceNotes, setSourceNotes] = React.useState("");
    const [categoryID, setCategoryID] = React.useState(-1);
    const [errorMsg, setErrorMsg] = React.useState("");
    const classes = useStyles();
    const InputProps = {
        classes: {
            root: classes.outlinedRoot,
            notchedOutline: classes.notchedOutline,
            focused: classes.focused
        },
    };

    const InputPropsShort = {
        classes: {
            root: classes.outlinedRootShort,
            notchedOutline: classes.notchedOutline,
            focused: classes.focused
        }
    };

    const handleInputChange = (event) => {
        const eventName = event.target.name;
        const eventValue = event.target.value;
        if (eventName === 'url') {
            setSourceUrl(eventValue);
        } else if (eventName === 'title') {
            setSourceTitle(eventValue);
        } else if (eventName === 'notes') {
            setSourceNotes(eventValue);
        } else if (eventName === 'category-select') {
            setCategoryID(eventValue);
        }
    };

    const resetInputs = () => {
        setSourceTitle("");
        setSourceUrl("");
        setSourceNotes("");
        setCategoryID(-1);
    };

    const handleGetImage = (categoryID, sourceID, url) => {
        const postParameters = {
            userID: props.userID,
            categoryID: categoryID,
            url: url,
            sourceID: sourceID
        };

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.response.startsWith("ERROR:")) {
                setErrorMsg(xhr.response.substring(6));
            } else {
                props.setSourceImg(JSON.parse(xhr.response), categoryID, sourceID);
            }
        });
        xhr.open('POST', 'http://localhost:3000/get_source_img', false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(postParameters));
    };

    const handleSubmit = () => {
        if (sourceUrl === "") {
            setErrorMsg("url is empty");
        } else {
            let categoryIDSubmit = categoryID;
            if (categoryID === -1 && props.categories[0] !== undefined) {
                categoryIDSubmit = props.categories[0]._id;
            }
            const postParameters = {
                userID: props.userID,
                categoryID: categoryIDSubmit,
                url: sourceUrl,
                sourceTitle: sourceTitle,
                sourceNotes: sourceNotes
            };

            const xhr = new XMLHttpRequest();
            xhr.addEventListener('load', () => {
                console.log(postParameters);
                console.log(xhr.response);
                if (xhr.response.startsWith("ERROR:")) {
                    setErrorMsg(xhr.response.substring(6));
                } else {
                    const newSource = JSON.parse(xhr.response);
                    props.addNewSource(newSource, categoryIDSubmit);
                    resetInputs();
                    setTimeout(function cb() {
                        handleGetImage(categoryIDSubmit, newSource._id, sourceUrl);
                    }, 0);
                }
            });
            xhr.open('POST', 'http://localhost:3000/new_source', false);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(postParameters));
        }
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
                <div id={'add-source-div'}>
                    <input name={'url'} value={sourceUrl} onChange={handleInputChange} />
                    <input name={'title'} value={sourceTitle} onChange={handleInputChange} />
                    <div id={'suggested-title'}>use suggested title</div>
                    <input name={'notes'} value={sourceNotes} onChange={handleInputChange} />
                    <select name={'category-select'} onChange={handleInputChange}>
                        {props.categories.map((category, index) => {
                            return (<option id={index} value={category._id}>{category.category_name}</option>)
                        })}
                    </select>
                    <Button id={'submit-new-source'} onClick={handleSubmit}>Add Source</Button>
                </div>
            </Dialog>
        </div>
    );
}
