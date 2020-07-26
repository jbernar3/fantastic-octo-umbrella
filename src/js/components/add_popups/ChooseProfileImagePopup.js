import * as constants from "../../constants.js";
import Zoom from '@material-ui/core/Zoom';
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Scrollbars from "react-scrollbars-custom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

const closeIconStyle = {
    fill: '#a65cff',
    width: '2.5vw',
    float: 'right',
    marginTop:  '1.5vw',
    marginRight: '1.2vw',
    cursor: 'pointer'
};

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

export default function ChooseProfileImagePopup(props) {
    const [currImg, setCurrImg] = React.useState(props.profileImg);

    const classes = useStyles();

    const images = [
        ['binary', 'python', 'code'],
        ['basketball', 'baseball', 'football'],
        ['books', 'glasses', 'gradcap'],
        ['cityscape', 'medic', 'cut'],
        ['silverware', 'chicken', 'wine'],
        ['fish', 'cat', 'palette'],
        ['headphones', 'microphone', 'music']
    ];

    const handleSave = () => {
        props.updateImg(currImg);
        props.handleClose();
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
                <div id={'choose-icon-popup'}>
                    <CloseIcon onClick={props.handleClose} style={closeIconStyle} />
                    <Scrollbars
                        style={{width: '38.25vw', height: '30vw', marginTop: '6vw', marginLeft: '2.25vw'}}
                        //id='source_scroll_div'
                        thumbYProps={{ className: "thumbY" }}
                        trackXProps={{ className: "trackX" }}
                    >
                        <div id={'img-container'}>
                            {images.map((imgRow) => {
                                return <div className={'img-row'}>
                                        {imgRow.map((img) => {
                                            if (currImg === img + '.png') {
                                                return <img className={'img-choose-img'} style={{backgroundColor: 'rgba(167, 93, 255, 0.4)'}}
                                                            src={'src/images/icons/' + img + '.png'} alt={img + ' icon'} />
                                            }
                                            return <img className={'img-choose-img'} src={'src/images/icons/' + img + '.png'} alt={img + ' icon'}
                                                        onClick={() => setCurrImg(img + ".png")} />
                                        })}
                                </div>
                                })
                            }
                        </div>
                    </Scrollbars>
                    <div style={{textAlign: 'center'}}><Button id={'img-save-btn'} onClick={handleSave}>save</Button></div>
                </div>
            </Dialog>
        </div>
    );
}
