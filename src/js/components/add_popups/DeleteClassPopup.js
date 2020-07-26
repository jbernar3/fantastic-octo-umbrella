import * as constants from "../../constants.js";
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Slide from "@material-ui/core/Slide";
import CloseIcon from '@material-ui/icons/Close';

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

export default function DeleteClassPopup(props) {
    const classes = useStyles();
    const [errorMsg, setErrorMsg] = React.useState("");

    const handleSubmit = () => {
        if (props.category === undefined || props.category === null) {
            props.handleClose();
        }
        props.handleDelete(props.category._id.toString());
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
                <div id={'delete-category-div'}>
                    <CloseIcon onClick={() => props.handleClose()} style={closeIconStyle} />
                    {props.category === undefined || props.category === null ? "" :
                        <div id={'delete-category-msg'} className={'houshcka_demibold'}>Are you sure you want to delete <div id={'delete-category-msg-inner'}>{props.category.category_name}</div>?</div>}
                        <div id={'delete-cat-buttons-div'}>
                            <Button onClick={handleSubmit} className={classes.submitButton}>yes</Button> <Button onClick={props.handleClose} className={classes.noButton}>no</Button>
                        </div>
                </div>
            </Dialog>
        </div>
    );
}
