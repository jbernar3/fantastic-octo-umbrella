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
    const [sourceURL, setSourceURL] = React.useState("");
    const [sourceTitle, setSourceTitle] = React.useState("");

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === "sourceURL") {
            setSourceURL(value);
        } else if (name === "sourceTitle") {
            setSourceTitle(value);
        }
    };

    const handleClose = (event) => {
        event.persist();
        props.onClose(event);
        setOpenAdd(false);
    };

    const handleAddBtnClick = () => {
        setOpenAdd(true);
        //props.handleOpenDialog("newSource", props.category.category_name, props.category.category_id)
    };

    const handleSubmit = () => {
        if (sourceURL === "") {
            console.log("error message");
        } else {
            setOpenAdd(false);
            props.addSource(sourceURL, sourceTitle, props.category.category_id);
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

    if (openAdd) {
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
                                   value={sourceURL}
                                   onChange={handleInputChange}
                        />
                        <TextField id="new_source"
                                   label="New Source Title"
                                   name="sourceTitle"
                                   autoComplete="new_source"
                                   autoFocus
                                   value={sourceTitle}
                                   onChange={handleInputChange}
                        />
                        <button onClick={handleSubmit}>Add Source</button>
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
