import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';
import React, {useEffect} from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import Scrollbars from "react-scrollbars-custom";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import {CopyToClipboard} from "react-copy-to-clipboard";
import DeleteIcon from '@material-ui/icons/Delete';

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
        marginTop: '3vw',
        marginRight: '-21.2vw'
    },
    editButton: {
        backgroundColor: 'rgba(166, 92, 254, 0.09)',
        borderRadius: '7px',
        border: 'none',
        fontFamily: 'houschka-rounded,sans-serif',
        fontWeight: 700,
        fontStyle: 'normal',
        fontSize: '1.2vw',
        color: '#a65cff',
        textTransform: 'none',
        marginTop: '1vw',
        marginLeft: '1vw'
    },
    deleteIconStyle: {
        color: '#a65cff',
        width: '2vw',
    }
}));

const notesScrollStyle = {
    float: 'right',
    marginRight: '4vw',
    marginTop: '-19.2vw',
    height: '22vw',
    width: '28vw'
};

const notesScrollStyleYoutube = {
    float: 'right',
    marginRight: '4vw',
    marginTop: '-18vw',
    height: '22vw',
    width: '28vw'
};

export default function SourcePopup(props) {
    const classes = useStyles();
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [newTitle, setNewTitle] = React.useState(null);
    const [newNotes, setNewNotes] = React.useState(null);
    const [errMsg, setErrMsg] = React.useState("");

    useEffect(() => {
        if (props.source !== null && newTitle === null && newNotes === null) {
            setNewTitle(props.source.source_name);
            setNewNotes(props.source.source_notes);
        }
    }, [props.source]);

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    const getSourceImg = (source) => {
        if (source.source_urlImgFlag) {
            let styleImg = {backgroundImage: "url(" + props.source.source_urlImg + ")", border:'2px solid #a65cff',
                backgroundPosition: 'center', width: '27vw', height: '15.2vw', backgroundSize: 'cover', marginTop: '3.8vw',
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
        let output = "date added: ";
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
        output += date.substring(8,10) + " ";
        return output + date.substring(0,4);
    };

    const handleClick = (name) => {
        if (name === 'open-btn') {
            window.open(props.source.url,'_blank');
        }
    };

    const getSourceNotes = (source) => {
        if (source.source_urlImgFlag && !source.has_user_notes) {
            return <div id={'source-popup-source-notes'} className={'houshcka_medium'} dangerouslySetInnerHTML={{ __html: props.source.source_notes }} />;
        } else if (source.source_notes === undefined || source.source_notes === "") {
            return <div id={'source-popup-source-notes'} className={'houshcka_medium'}>no source notes</div>;
        }
        return <div id={'source-popup-source-notes'} className={'houshcka_medium'}>
            {source.source_notes}
        </div>
    };

    const handleInputChange = (event) => {
        const eventName = event.target.name;
        const eventValue = event.target.value;
        if (eventName === 'title') {
            setNewTitle(eventValue);
        } else if (eventName === 'notes') {
            setNewNotes(eventValue);
        }
    };

    const handleOnInput = (event) => {
        event.target.style.height = "";
        event.target.style.height = event.target.scrollHeight + "px";
    };

    const handleCancelEdit = () => {
        if (isEditMode) {
            setNewTitle(props.source.source_name);
            setNewNotes(props.source.source_notes);
        }
        setIsEditMode(!isEditMode);
    };

    const handleSubmit = () => {
        if (props.categoryID !== null && props.source !== null) {
            if (newTitle === "") {
                setErrMsg("title cannot be empty");
            } else {
                const postParameters = {
                    userID: props.userID,
                    categoryID: props.categoryID,
                    sourceID: props.source._id,
                    newTitle: newTitle,
                    newNotes: newNotes
                };

                const xhr = new XMLHttpRequest();
                xhr.addEventListener('load', async () => {
                    if (xhr.response.startsWith("ERROR:")) {
                        setErrMsg(xhr.response.substring(6));
                    } else {
                        props.handleEditSource(props.categoryID, JSON.parse(xhr.response));
                        setIsEditMode(false);
                    }
                });
                xhr.open('POST', 'http://localhost:3000/edit_source', false);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(postParameters));
            }
        }
    };

    return (
        <div id={'source-popup-div'}>
            <div id={'source-popup-edit-div'} className={'houshcka_demibold'} onClick={handleCancelEdit}>{isEditMode ? "cancel edit" : "edit"}</div>
            <CloseIcon onClick={props.handleClose}
                       style={{fill: '#a65cff', width: '2.4vw', float: 'right', marginTop: '-1.2vw', marginRight: '1.3vw', cursor: 'pointer'}} />
            {props.source !== null ?
                <React.Fragment>
                    {isEditMode ? <div id={'edit-source-title'}><input name={'title'} value={newTitle} onChange={handleInputChange} className={'edit-source-inputs'} /></div> :
                        <div id={'source-popup-title'} className={'houshcka_demibold'}>{props.source.source_name}</div>}
                    {props.categoryName === undefined ? "" :
                        <div id={'source-popup-cat'} className={'houshcka_demibold'}>class: {props.categoryName}</div>}
                    {getSourceImg(props.source)}
                    <div id={'source-popup-date'} className={'houshcka_medium'}>{beautifyDate(props.source.date_added)}</div>
                    {isEditMode ? "" :
                        <React.Fragment>
                            <button id={'source-popup-open-src'} className={'houshcka_demibold open-src-button'}
                                onClick={() => handleClick('open-btn')}>open source</button>
                            <CopyToClipboard text={props.source.url}>
                                <button id={'source-popup-copy-url'} className={'houshcka_demibold open-src-button'} onClick={(event) => event.stopPropagation()}>copy url</button>
                            </CopyToClipboard>
                        </React.Fragment>
                    }
                    {isEditMode ? <React.Fragment><Scrollbars
                            style={{float: 'right', width: '32vw', marginTop: '-19vw', height: '21vw', marginRight: '2.7vw'}}
                            //id='source_scroll_div'
                            thumbYProps={{ className: "thumbY" }}
                            trackXProps={{ className: "trackX" }}
                        >
                            <textarea id={'edit-source-notes-textarea'} className={'scrollable-textarea'} name={'notes'} value={newNotes} onChange={handleInputChange} onInput={handleOnInput} />
                        </Scrollbars>
                            <Button onClick={handleSubmit} className={classes.submitButton}>submit changes</Button>
                        </React.Fragment>:
                        <Scrollbars
                            style={props.source.source_urlImgFlag ? notesScrollStyleYoutube : notesScrollStyle}
                            id='source_scroll_div'
                            ref={ref => (scrollbars = ref)}
                            thumbYProps={{ className: "thumbY" }}
                            trackXProps={{ className: "trackX" }}
                        >
                            {getSourceNotes(props.source)}
                        </Scrollbars>}
                </React.Fragment>
            : ""}
            <div>{errMsg}</div>
        </div>
    );
}
