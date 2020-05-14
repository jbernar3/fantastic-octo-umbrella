import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
    root: {
        minWidth: '30ch',
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

export default function NewCategoryPopup(props) {
    const classes = useStyles();
    const [newCategoryField, setCategoryField] = useState("");

    const handleInputChange = (event) => {
        setCategoryField(event.target.value);
    };

    const handleSubmit = () => {
        if (newCategoryField === "") {
            console.log("error message");
        } else {
            props.handleSubmit(newCategoryField);
        }
    };

    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader
                className={classes.header}
                title="Add Category"
                //subheader={ shiftInfo.orgName }
            />
            <CardContent className={classes.content}>
                <TextField id="new_category"
                           label="New Category"
                           name="new_category"
                           autoComplete="new_category"
                           autoFocus
                           value={newCategoryField}
                           onChange={handleInputChange}
                />
                <button onClick={handleSubmit}>Add Category</button>
            </CardContent>
        </Card>
    );
}
