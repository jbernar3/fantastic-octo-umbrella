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
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
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
        marginTop: '7.8vw',
        marginRight: '-19.5vw'
    }
}));

export default function SourcePopup(props) {
    const classes = useStyles();

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    const getSourceImg = (source) => {
        if (source.source_urlImgFlag) {
            let styleImg = {backgroundImage: "url(" + props.source.source_urlImg + ")", border:'2px solid #a65cff',
                backgroundPosition: 'center', width: '27vw', height: '16vw', backgroundSize: 'cover', marginTop: '3vw',
            marginLeft: '5vw'};
            return (<div style={styleImg}>
            </div>);
        } else if (source.source_img === undefined) {
            let styleGif = {width: '50%', height: '50%', marginTop: '-4%', marginLeft: '20%'};
            return (<div className={classes.sourceimg}>
                <img src={'src/images/loadingclasifygif.gif'} alt={'clasify loading gif'} style={styleGif} />
            </div>);
        } else {
            let styleImg = {width: '27vw', height: '16vw', border:'2px solid #a65cff', marginTop: '3vw',
                marginLeft: '5vw'};
            return (<div className={classes.sourceimg}>
                <img src={`data:image/png;base64,${arrayBufferToBase64(source.source_img.data.data)}`}  alt={"temp source img"}
                     style={styleImg}/>
            </div>);
        }
    };

    const beautifyDate = (date) => {
        let output = "";
        console.log(date);
        const monthNum = date.substring(5, 7);
        if (monthNum === '01') {
            output += "January ";
        } else if (monthNum === '02') {
            output += "February ";
        } else if (monthNum === '03') {
            output += "March ";
        } else if (monthNum === '04') {
            output += "April ";
        } else if (monthNum === '05') {
            output += "May ";
        } else if (monthNum === '06') {
            output += "June ";
        } else if (monthNum === '07') {
            output += "July ";
        } else if (monthNum === '08') {
            output += "August ";
        } else if (monthNum === '09') {
            output += "September ";
        } else if (monthNum === '10') {
            output += "October ";
        } else if (monthNum === '11') {
            output += "November ";
        } else if (monthNum === '12') {
            output += "December ";
        }
        output += date.substring(8,10) + ", ";
        return output + date.substring(0,4);
    };

    return (
        <div id={'source-popup-div'}>
            <CloseIcon onClick={props.handleClose}
                       style={{fill: '#a65cff', width: '2.4vw', float: 'right', marginTop:  '1.3vw', marginRight: '1.3vw', cursor: 'pointer'}} />
            {props.source !== null ?
                <React.Fragment>
                    <div id={'source-popup-title'} className={'houshcka_demibold'}>{props.source.source_name}</div>
                    {props.categoryName === undefined ? "" :
                        <div id={'source-popup-cat'} className={'houshcka_demibold'}>class: {props.categoryName}</div>}
                    {getSourceImg(props.source)}
                    <div>{beautifyDate(props.source.date_added)}</div>
                </React.Fragment>
            : ""}
        </div>
    );
}
