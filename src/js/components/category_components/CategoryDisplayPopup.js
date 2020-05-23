import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dialog from "@material-ui/core/Dialog";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    popupcard: {
        minWidth: '70ch',
        minHeight: '60ch'
    },
    content: {
        display: 'flex',
        marginBottom: -15,
    },
    inline: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    title: {
        fontSize: 14,
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    accept: {
        alignSelf: "end",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        display: 'flex',
        marginLeft: '6rem',
    },
    release: {
        alignSelf: "end",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        display: 'flex',
        marginLeft: '10rem',
    },
    avatar: {
        '&:hover': {
            cursor: 'pointer',
        }
    },
    header: {
        marginBottom: -20,
    },
    button: {
        margin: 3,
    },
    addIcon: {
        float: 'right'
    },
    sources: {

    },
    collapse_container: {
        width: '100%'
    }
});

export default function NewSourcePopup(props) {
    const classes = useStyles();
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openSecondAdd, setOpenSecondAdd] = React.useState(false);
    const [sourceURL, setSourceURL] = React.useState("");
    const [sourceTitle, setSourceTitle] = React.useState("");
    const [sourceNotes, setSourceNotes] = React.useState("");

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === "sourceURL") {
            setSourceURL(value);
        } else if (name === "sourceTitle") {
            setSourceTitle(value);
        } else if (name === "sourceNotes") {
            setSourceNotes(value);
        }
    };

    const handleNewSource = () => {
        const postParameters = {
            userID: props.userID,
            categoryID: props.category.category_id,
            url: sourceURL,
            sourceTitle: sourceTitle,
            sourceNotes: sourceNotes
        };
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            console.log(xhr.response);
            if (xhr.response === "error") {
                console.log("handle new source error");
            } else {
                props.updateCategories(JSON.parse(xhr.response));
                handleCancel();
            }
        });
        xhr.open('POST', 'http://localhost:3000/new_source', false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(postParameters));
    };

    const handleClose = (event) => {
        event.persist();
        props.changeCategoryDisplay(-1);
        setOpenAdd(false);
    };

    const handleCancel = () => {
        setOpenAdd(false);
        setOpenSecondAdd(false);
        setSourceURL("");
        setSourceTitle("");
        setSourceNotes("");
    };

    const handleAddBtnClick = () => {
        setOpenAdd(true);
        //props.handleOpenDialog("newSource", props.category.category_name, props.category.category_id)
    };

    const handleNext = () => {
        const postParameters = {
            url: sourceURL
        };
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            setOpenSecondAdd(true);
        });
        xhr.open('POST', 'http://localhost:3000/get_scraped_source', false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(postParameters));
    };

    const handleBack = () => {
        setOpenSecondAdd(false);
        setSourceTitle("");
        setSourceURL("");
    };

    const handleSubmit = () => {
        if (sourceURL === "") {
            console.log("error message");
        } else {
            handleNewSource();
        }
    };

    const toggleHover = (isEnter) => (event) => {
        event.persist();
        if (isEnter) {
            document.body.style.cursor = "pointer";
        } else {
            document.body.style.cursor = "default";
        }
    };

    if (openSecondAdd && openAdd) {
        return (
            <Dialog className={classes.dialog} open={props.dialogOpen} onClose={handleClose}>
                <Card className={classes.popupcard} variant="outlined">
                    <CardHeader
                        className={classes.header}
                        title={<div>Add Source</div>}
                        subheader={props.category.category_name}
                    />
                    <CardContent className={classes.content}>
                        <div>URL: {sourceURL}</div>
                        <TextField id="new_source"
                                   label="New Source Title"
                                   name="sourceTitle"
                                   autoComplete="new_source"
                                   autoFocus
                                   variant={"outlined"}
                                   value={sourceTitle}
                                   onChange={handleInputChange}
                        />
                        <TextField id="new_source_notes"
                                   label="Notes"
                                   name="sourceNotes"
                                   autoComplete="new_source"
                                   autoFocus
                                   variant={"outlined"}
                                   value={sourceNotes}
                                   onChange={handleInputChange}
                        />
                        <button onClick={handleSubmit}>Add Source</button>
                        <button onClick={handleBack}>Back</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </CardContent>
                </Card>
            </Dialog>
        )

    } else if (openAdd) {
        return (
            <Dialog className={classes.dialog} open={props.dialogOpen} onClose={handleClose}>
                <Card className={classes.popupcard} variant="outlined">
                    <CardHeader
                        className={classes.header}
                        title={<div>Add Source</div>}
                        subheader={props.category.category_name}
                    />
                    <CardContent className={classes.content}>
                        <TextField id="new_source_url"
                                   label="New Source URL"
                                   name="sourceURL"
                                   autoComplete="new_source"
                                   autoFocus
                                   variant={"outlined"}
                                   value={sourceURL}
                                   onChange={handleInputChange}
                        />
                        <button onClick={handleNext}>Next</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </CardContent>
                </Card>
            </Dialog>
        );
    }
    return (
        <Dialog className={classes.dialog} open={props.dialogOpen} onClose={handleClose}>
            <Card className={classes.popupcard} variant="outlined">
                <CardHeader
                    className={classes.header}
                    title={<div>{props.category.category_name}<AddIcon onMouseEnter={toggleHover(true)} onMouseLeave={toggleHover(false)}
                                                             className={classes.addIcon} onClick={handleAddBtnClick} /></div>}
                    subheader="created on"
                    />
                <CardContent className={classes.content}>
                    <div className={classes.sources}>
                        {props.category.sources.map(function(source, index) {
                        return (<div key={index}>{source.source_name}</div>);})}
                    </div>
                </CardContent>
            </Card>
        </Dialog>
    );
}
