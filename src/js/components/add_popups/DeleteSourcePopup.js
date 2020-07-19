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
        paddingLeft: '1.8vw',
        paddingRight: '1.8vw',
    },
    noButton: {
        marginLeft: '4.5vw',
        backgroundColor: 'rgba(166, 92, 254, 0.09)',
        borderRadius: '7px',
        border: 'none',
        fontFamily: 'houschka-rounded,sans-serif',
        fontWeight: 700,
        fontStyle: 'normal',
        fontSize: '1.3vw',
        color: '#a65cff',
        textTransform: 'none',
        paddingLeft: '1.8vw',
        paddingRight: '1.8vw',
    }
}));

const closeIconStyle = {
    fill: '#a65cff',
    width: '2vw',
    float: 'right',
    marginTop:  '1.4vw',
    marginRight: '1.5vw',
    cursor: 'pointer'
};

export default function DeleteSourcePopup(props) {
    const classes = useStyles();
    const [errorMsg, setErrorMsg] = React.useState("");

    const handleSubmit = () => {
        if (props.source === undefined || props.source === null) {
            props.handleClose();
        } else {
            const postParameters = {
                userID: props.userID,
                categoryID: props.categoryID,
                sourceID: props.source._id.toString()
            };

            const xhr = new XMLHttpRequest();
            xhr.addEventListener('load',  () => {
                if (xhr.response.startsWith("ERROR:")) {
                    setErrorMsg(xhr.response.substring(6));
                } else {
                    props.handleDeleteSource(props.categoryID, props.source._id.toString());
                    props.handleClose();
                }
            });
            xhr.open('POST', 'http://localhost:3000/delete_source', false);
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
                maxWidth={false}
            >
                <div id={'delete-source-div'}>
                    <CloseIcon onClick={() => props.handleClose()} style={closeIconStyle} />
                    {props.source === undefined || props.source === null ? "" :
                        <React.Fragment><div id={'delete-source-msg'} className={'houshcka_demibold'}>Are you sure you want to delete <div id={'delete-category-msg-inner'}>{props.source.source_name}</div></div>
                        <div id={'delete-source-msg-2'} className={'houshcka_demibold'}>from <div id={'delete-category-msg-inner'}>{props.categoryName}</div>?</div></React.Fragment>}
                    <div id={'delete-cat-buttons-div'}>
                        <Button onClick={handleSubmit} className={classes.submitButton}>yes</Button> <Button onClick={props.handleClose} className={classes.noButton}>no</Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
