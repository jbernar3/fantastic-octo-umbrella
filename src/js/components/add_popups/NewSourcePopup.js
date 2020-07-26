import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import * as constants from "../../constants.js";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

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

export default function NewSourcePopup(props) {
    const classes = useStyles();
    const [categoryName, setCategoryName] = useState(props.defaultCategoryName);
    const [categoryID, setCategoryID] = useState(props.defaultCategoryID);
    const [sourceTitle, setSourceTitle] = useState("");
    const [sourceURL, setSourceURL] = useState("");
    const [sourceNotes, setSourceNotes] = useState("");

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === "sourceURL") {
            setSourceURL(value);
        } else if (name === "sourceTitle") {
            setSourceTitle(value);
        }
    };

    const handleSubmit = () => {
        if (sourceURL === "") {
            console.log("error message");
        } else {
            props.handleSubmit(sourceURL, sourceTitle, categoryID);
        }
    };

    const handleCategoryChange = (event) => {
        setCategoryName(event.target.value);
        setCategoryID(props.categories[parseInt(event.target.value.substring(0,1))]._id);

    };

    if (props.defaultCategoryID !== "") {
        return(<Card className={classes.root} variant="outlined">
            <CardHeader
                className={classes.header}
                title={"Add Source to " + props.defaultCategoryName}
                //subheader={ shiftInfo.orgName }
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
                <TextField id="new_source_notes"
                           label="Notes"
                           name="sourceNotes"
                           autoComplete="new_source"
                           autoFocus
                           value={sourceNotes}
                           onChange={handleInputChange}
                />
                <button onClick={handleSubmit}>Add Source</button>
            </CardContent>
        </Card>);
    }

    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader
                className={classes.header}
                title="Add Source"
                //subheader={ shiftInfo.orgName }
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
                <TextField id="new_source_notes"
                           label="Notes"
                           name="sourceNotes"
                           autoComplete="new_source"
                           autoFocus
                           value={sourceNotes}
                           onChange={handleInputChange}
                />
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryName}
                    onChange={handleCategoryChange}
                >
                    {props.categories.map(function(category, index) {
                        return <MenuItem key={index} value={index + category.category_name}>{category.category_name}</MenuItem>
                    })}
                </Select>
                <button onClick={handleSubmit}>Add Source</button>
            </CardContent>
        </Card>
    );
}
