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
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles({
    popupcard: {
        minWidth: '80ch',
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
});

export default function NewSourcePopup(props) {
    const classes = useStyles();

    const handleClose = (event) => {
        event.persist();
        props.onClose(event);
    };


    return (
        <Dialog className={classes.dialog} open={props.dialogOpen} onClose={handleClose}>
            <Card className={classes.popupcard} variant="outlined">
                <CardHeader
                    className={classes.header}
                    title={props.categoryName}
                    //subheader={ shiftInfo.orgName }
                />
                <CardContent className={classes.content}>
                    {props.sources.map(function(source, index) {
                        return (<div key={index}>{source.source_name},</div>);
                    })}
                </CardContent>
            </Card>
        </Dialog>
    );
}
