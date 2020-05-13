import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 180,
        width: 10000,
        marginLeft: -17
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing(0),
        width: 10000
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
}));

export default function CollapseAddShift(props) {
    const classes = useStyles();
    //const [checked, setChecked] = React.useState(false);
    const [sourceTitle, setSourceTitle] = React.useState("");
    const [sourceURL, setSourceURL] = React.useState("");

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === "sourceTitle") {
            setSourceTitle(value);
        } else if (name === "sourceURL") {
            setSourceURL(value);
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Collapse in={props.showAddShift}>
                    <Paper elevation={4} className={classes.paper}>
                        <TextField label={"New Source Title"}
                                   name={"sourceTitle"}
                                   autoComplete="new_source"
                                   autoFocus
                                   value={sourceTitle}
                                   onChange={handleInputChange}/>
                        <TextField label={"New Source URL"}
                                   name={"sourceURL"}
                                   autoComplete="new_source"
                                   autoFocus
                                   value={sourceURL}
                                   onChange={handleInputChange}/>
                        <Button color="default" variant="contained">Add Source</Button>
                    </Paper>
                </Collapse>
            </div>
        </div>
    );
}
