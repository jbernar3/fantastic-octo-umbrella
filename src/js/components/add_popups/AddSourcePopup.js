import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Scrollbars from "react-scrollbars-custom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import * as constants from "../../constants.js";
import 'babel-polyfill';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

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

export default function AddSourcePopup(props) {
    const [sourceTitle, setSourceTitle] = React.useState("");
    const [sourceUrl, setSourceUrl] = React.useState("");
    const [prevUrlChecked, setPrevUrlChecked] = React.useState("");
    const [sourceNotes, setSourceNotes] = React.useState("");
    const [categoryID, setCategoryID] = React.useState(-1);
    const [suggestedTitle, setSuggestedTitle] = React.useState("");
    const [suggestedTitleParam, setSuggestedTitleParam] = React.useState("");
    const [loadingSuggestedTitle, setLoadingSuggestedTitle] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const classes = useStyles();

    const InputProps = {
        classes: {
            root: classes.outlinedRoot,
            notchedOutline: classes.notchedOutline,
            focused: classes.focused
        },
    };

    const InputPropsShort = {
        classes: {
            root: classes.outlinedRootShort,
            notchedOutline: classes.notchedOutline,
            focused: classes.focused
        }
    };

    const handleInputChange = (event) => {
        const eventName = event.target.name;
        const eventValue = event.target.value;
        setErrorMsg("");
        if (eventName === 'url') {
            setSourceUrl(eventValue);
            setSuggestedTitleParam('');
            setSuggestedTitle('');
            setPrevUrlChecked('');
        } else if (eventName === 'title') {
            setSourceTitle(eventValue);
        } else if (eventName === 'notes') {
            setSourceNotes(eventValue);
        } else if (eventName === 'parent_cat_select') {
            setCategoryID(eventValue);
            event.target.blur();
        }
    };

    const resetInputs = () => {
        setErrorMsg("");
        setSourceTitle("");
        setSourceUrl("");
        setSourceNotes("");
        setCategoryID(-1);
        setSuggestedTitle("");
        setSuggestedTitleParam("");
    };

    const handleGetImage = (categoryID, globalSourceID, sourceID) => {
        const postParameters = {
            sourceID: globalSourceID
        };

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.response.startsWith("ERROR:")) {
                setErrorMsg(xhr.response.substring(6));
            } else {
                props.setSourceImg(JSON.parse(xhr.response), categoryID, sourceID);
            }
        });
        // xhr.open('POST', 'http://localhost:3000/get_source_img', false);
        xhr.open('POST', constants.HOST_NAME + 'get_source_img', false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(postParameters));
    };

    const handleSubmit = () => {
        if (sourceUrl === "") {
            setErrorMsg("url is empty");
        } else if (props.mapCategories.size === 0) {
            setErrorMsg("no category is selected");
        } else {
            let categoryIDSubmit = categoryID;
            if (categoryID === -1 && props.mapCategories.get(props.currCatID) !== undefined) {
                categoryIDSubmit = props.mapCategories.get(props.currCatID)._id;
            }
            const postParameters = {
                userID: props.userID,
                categoryID: categoryIDSubmit,
                url: sourceUrl,
                sourceTitle: sourceTitle,
                sourceNotes: sourceNotes,
                suggestedTitle: suggestedTitleParam
            };

            const xhr = new XMLHttpRequest();
            xhr.addEventListener('load', async () => {
                if (xhr.response.startsWith("ERROR:")) {
                    setErrorMsg(xhr.response.substring(6));
                } else {
                    const newSource = JSON.parse(xhr.response);
                    await props.addNewSource(newSource, categoryIDSubmit);
                    await resetInputs();
                    if (!newSource.source_urlImgFlag && newSource.source_img === undefined) {
                        setTimeout(function cb() {
                            handleGetImage(categoryIDSubmit, newSource.source_id, newSource._id);
                        }, 1000);
                    }
                }
            });
            // xhr.open('POST', 'http://localhost:3000/new_source', false);
            xhr.open('POST', constants.HOST_NAME + 'new_source', false);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(postParameters));
        }
    };

    const handleOnInput = (event) => {
        event.target.style.height = "";
        event.target.style.height = event.target.scrollHeight + "px";
    };

    const handleMouseDown = (event) => {
        if (event.target.options && event.target.options.length>6) {
            event.target.size = 6;
        }
    };

    const handleSuggestedTitle = async () => {
        if (sourceUrl.length > 4 && sourceUrl !== prevUrlChecked) {
            await setLoadingSuggestedTitle(true);
            const xhr = new XMLHttpRequest();
            xhr.addEventListener('load', async () => {
                if (props.popupOpen) {
                    await setLoadingSuggestedTitle(false);
                    setPrevUrlChecked(sourceUrl);
                    if (xhr.response.substring(0, 6) === 'ERROR:') {
                        setSuggestedTitle('invalid url, please try again');
                    } else {
                        setSuggestedTitle(xhr.response);
                        setSuggestedTitleParam(xhr.response);
                    }
                }
            });
            // xhr.open('POST', 'http://localhost:3000/get_suggested_title', true);
            xhr.open('POST', constants.HOST_NAME + 'get_suggested_title', true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify({ url: sourceUrl}));
        }
    };

    const handleUseSuggestedTitle = () => {
        if (suggestedTitle !== "") {
            setSourceTitle(suggestedTitle);
            setSuggestedTitle("");
        }
    };

    const generateOptions = (categoryID) => {
        if (!props.mapCategories.get(categoryID) === undefined) {
            return "";
        }
        return (<React.Fragment>
            {props.mapSubcategories.get(categoryID) ? props.mapSubcategories.get(categoryID).map((subCat) => {
                if (props.currCatID === props.mapCategories.get(subCat)._id.toString()) {
                    return (<React.Fragment>
                        <option id={subCat} selected={'selected'} className={'select-options'} value={subCat}>
                            {props.mapCategories.get(subCat) ? props.mapCategories.get(subCat).category_name : ""}
                        </option>
                    </React.Fragment>)
                }
                return (<React.Fragment>
                    <option id={subCat} className={'select-options'} value={subCat}>
                        {props.mapCategories.get(subCat) ? props.mapCategories.get(subCat).category_name : ""}
                    </option>
                    {generateOptions(subCat)}
                </React.Fragment>);
            }) : ""}
        </React.Fragment>)
    };

    return (
        <div>
            <Dialog
                open={props.popupOpen}
                TransitionComponent={Transition}
                keepMounted
                onOpen={() => resetInputs()}
                onClose={() => {props.handleClose(); resetInputs();}}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth={false}
            >
                <div id={'add-source-div'}>
                    <CloseIcon onClick={() => {props.handleClose(); resetInputs();}} style={{fill: '#a65cff', width: '2.4vw', float: 'right', marginTop:  '1.3vw', marginRight: '1.3vw', cursor: 'pointer'}} />
                    <div className={'houshcka_demibold'} style={{fontSize: '1.1vw', marginTop: '9vw', marginLeft: '4.2vw', width: '32.4vw'}}>website url</div>
                    <div style={{marginTop: '.8vw', width: '32.6vw'}}>
                        <input name={'url'} className={'new-source-inputs'} style={{height: '3.5vw'}} value={sourceUrl} onChange={handleInputChange} onMouseLeave={handleSuggestedTitle} />
                    </div>
                    <div className={'houshcka_demibold'} style={{fontSize: '1.1vw', marginTop: '2vw', marginLeft: '4.2vw', width: '32.4vw'}}>source title</div>
                    <div style={{marginTop: '.8vw', width: '32.6vw'}}>
                        <input name={'title'} className={'new-source-inputs'} style={{height: '3.5vw'}} value={sourceTitle} onChange={handleInputChange} />
                    </div>
                    {loadingSuggestedTitle ? <div id={'suggested-title'}><img id={'suggested-title-loading'} src={'src/images/loadingroll.gif'} alt={'loading roll gif'} /></div> :
                        <div id={'suggested-title'} className={'houshcka_demibold'} onClick={handleUseSuggestedTitle}>
                        {suggestedTitle !== "use suggested title: " ? "use suggested title: " + suggestedTitle : ""}
                    </div>}
                    <div className={'houshcka_demibold'} style={{fontSize: '1.1vw', float: 'right', width: '34.6vw', marginTop: '-16.17vw'}}>notes</div>
                    <Scrollbars
                        style={{float: 'right', width: '32vw', marginTop: '-13.77vw', height: '25vw', marginRight: '2.7vw'}}
                        //id='source_scroll_div'
                        thumbYProps={{ className: "thumbY" }}
                        trackXProps={{ className: "trackX" }}
                    >
                        <textarea id={'source-notes-textarea'} className={'scrollable-textarea'} name={'notes'} value={sourceNotes} onChange={handleInputChange} onInput={handleOnInput} />
                    </Scrollbars>
                    <div className={'houshcka_demibold'} style={{fontSize: '1.1vw', marginLeft: '4.2vw', marginTop: '2vw'}}>class</div>
                    <select id={'cat-select'} className={'new-source-inputs'} onMouseDown={handleMouseDown} onBlur={(event) => {event.target.size = 0}} name={'parent_cat_select'} onChange={handleInputChange}>
                        {props.rootCategories.map((rootID, index) => {
                            return (<React.Fragment>
                                <option className={'select-options'} key={rootID}
                                        value={rootID}>{props.mapCategories.get(rootID).category_name}</option>
                                {generateOptions(rootID)}
                            </React.Fragment>);
                        })}
                    </select>
                    {errorMsg === "" ? <Button className={classes.submitButton} onClick={handleSubmit}>add source</Button> :
                        <div id={'add-source-error-div'} className={'houshcka_demibold'}>{errorMsg}</div>}
                </div>
            </Dialog>
        </div>
    );
}
