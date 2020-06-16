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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
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
    submitButton: {
        backgroundColor: 'rgba(166, 92, 254, 0.09)',
        borderRadius: '7px',
        border: 'none',
        fontFamily: 'houschka-rounded,sans-serif',
        fontWeight: 700,
        fontStyle: 'normal',
        fontSize: '1.2vw',
        color: '#a65cff',
        textTransform: 'none',
        float: 'right',
        marginTop: '10vw',
        marginRight: '-19.5vw'
    }
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
            xhr.addEventListener('load', async () => {
                console.log(postParameters);
                console.log(xhr.response);
                if (xhr.response.startsWith("ERROR:")) {
                    setErrorMsg(xhr.response.substring(6));
                } else {
                    const newSource = JSON.parse(xhr.response);
                    await props.addNewSource(newSource, categoryIDSubmit);
                    await resetInputs();
                    setTimeout(function cb() {
                        handleGetImage(categoryIDSubmit, newSource._id, sourceUrl);
                    }, 2000);
                }
            });
            xhr.open('POST', 'http://localhost:3000/new_source', false);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(postParameters));
        }
    };

    const handleOnInput = (event) => {
        event.target.style.height = "";
        event.target.style.height = event.target.scrollHeight + "px";
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
                maxWidth={false}
            >
                <div id={'add-source-div'}>
                    <div className={'houshcka_medium'} style={{fontSize: '1.2vw', marginTop: '10vw', marginLeft: '4.2vw', width: '32.4vw'}}>website url</div>
                    <div style={{marginTop: '.8vw', width: '32.6vw'}}>
                        <input name={'url'} className={'new-source-inputs'} value={sourceUrl} onChange={handleInputChange} />
                    </div>
                    <div className={'houshcka_medium'} style={{fontSize: '1.2vw', marginTop: '2vw', marginLeft: '4.2vw', width: '32.4vw'}}>source title</div>
                    <div style={{marginTop: '.8vw', width: '32.6vw'}}>
                        <input name={'title'} className={'new-source-inputs'} value={sourceTitle} onChange={handleInputChange} />
                    </div>
                    <div id={'suggested-title'} className={'houshcka_demibold'}>use suggested title</div>
                    <div className={'houshcka_medium'} style={{fontSize: '1.2vw', float: 'right', width: '34.6vw', marginTop: '-16.2vw'}}>notes</div>
                    <Scrollbars
                        style={{float: 'right', width: '32vw', marginTop: '-13.8vw', height: '23vw', marginRight: '2.7vw'}}
                        //id='source_scroll_div'
                        thumbYProps={{ className: "thumbY" }}
                        trackXProps={{ className: "trackX" }}
                    >
                        <textarea id={'new-notes-textarea'} name={'notes'} value={sourceNotes} onChange={handleInputChange} onInput={handleOnInput} />
                    </Scrollbars>
                    <select name={'category-select'} onChange={handleInputChange}>
                        {props.categories.map((category, index) => {
                            return (<option id={index} value={category._id}>{category.category_name}</option>)
                        })}
                    </select>
                    <Button className={classes.submitButton} onClick={handleSubmit}>add source</Button>
                </div>
            </Dialog>
        </div>
    );
}
