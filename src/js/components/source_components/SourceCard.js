import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import DeleteIcon from '@material-ui/icons/Delete';
import * as constants from "../../constants.js";

const useStyles = makeStyles({
    root: {
        minWidth: '80vh',
        marginBottom: '2%',
        height: '30vh',
        backgroundColor: '#ececec',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(166, 92, 254, 0.29)'
        }
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    description: {
        marginTop: '1%',
        fontFamily: 'houschka-rounded,sans-serif',
        fontWeight: 300,
        fontStyle: 'normal',
        fontSize: '1vw',
        width: '67.5%',
        display: 'inline-block',
        height: '9vh',
        overflow: 'hidden'
    },
    sourceimg: {
        float: 'right',
        width: '30%',
        top: '50%',
        //height:  '25%',
        //display: 'inline-block',
    },
    pos: {
        marginBottom: 12,
    },
    img: {
        marginLeft: '-10px',
        marginTop: '-10px',
        width: '200px',
        height: '25px',
    },
    deleteIconStyle: {
        display: 'inline-block',
        color: '#a65cff',
        marginLeft: '.8vw',
        '&:hover': {
            color: 'rgba(166,92,254,0.42)'
        }
    }
});

const styleImg = {
    width: '18.5vw',
    height: '11.3vw',
    border:'2px solid #a65cff',
    marginTop: '-1.7vw',
    float: 'right',
    marginRight: '.5vw'
};

export default function SourceCard(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [source, setSource] = React.useState(props.source);
    const [showDelete, setShowDelete] = React.useState(false);

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    const handleClick = (event, name) => {
        if (name === 'open-button') {
            window.open(source.url,'_blank');
            event.stopPropagation();
        } else if (name === 'source-card') {
            props.openSourcePopup();
        }
    };

    useEffect(
        () => { setSource(props.source); },
        [props.source]);

    const getSourceImg = (source) => {
        console.log("THIS IS SOURCE IN GET SOURCE IMG");
        console.log(source);
        if (source.source_urlImgFlag) {
            return (<div className={classes.sourceimg}>
                <img src={source.source_urlImg}  alt={"temp source img"}
                     style={styleImg}/>
            </div>);
        } else if (source.source_img === undefined || source.source_img.data === undefined) {
            let styleGif = {width: '10vw', height: '10vw', marginTop: '-.5vw', marginRight: '5vw', float: 'right'};
            // if (!props.drawerOpen) {
            //     styleGif = {width: '50%', height: '50%', marginTop: '-8.3%', marginLeft: '23%'};
            // }
            return (<div className={classes.sourceimg}>
                <img src={'src/images/loadingclasifygif.gif'} alt={'clasify loading gif'} style={styleGif} />
            </div>);
        } else {
            return (<div className={classes.sourceimg}>
                <img src={`data:image/png;base64,${arrayBufferToBase64(source.source_img.data.data)}`}  alt={"temp source img"}
                     style={styleImg}/>
            </div>);
        }
    };

    const getSourceNotes = (source) => {
        if (source.source_urlImgFlag && !source.has_user_notes) {
            return <div id={'source-card-description'} dangerouslySetInnerHTML={{ __html: source.source_notes }} />
        } else if (source.source_notes === undefined || source.source_notes === "") {
            return <div id={'source-card-description'}>no source notes.</div>
        } else {
            return source.source_notes;
        }
    };

    const handleDeleteSource = (event) => {
        event.stopPropagation();
        if (source) {
            props.changeDeleteSource(source);
        }
    };

    return (
        <Card name={'source-card'} className={classes.root}
              style={{borderRadius: 6}} onClick={(event) => handleClick(event, 'source-card')}
              onMouseEnter={() => setShowDelete(true)} onMouseLeave={() => setShowDelete(false)}>
            <CardContent>
                {props.drawerOpen ? <div className={'source_title'}>
                    {source.source_name.length > 55 ? source.source_name.substring(0, 55) + "..." : source.source_name}
                </div> :
                    <div className={'source_title'}>
                        {source.source_name.length > 75 ? source.source_name.substring(0, 75) + "..." : source.source_name}
                    </div>}
                <div id={'source-card-description'} style={props.drawerOpen ? {width: '35vw'} : {width: '40vw'}}>
                    {getSourceNotes(source)}
                </div>
                {getSourceImg(source)}

            </CardContent>
            <CardActions>
                <button id={'source-card-open-src'} className={'houshcka_demibold open-src-button'}
                        onClick={(event) => handleClick(event,'open-button')}>open source</button>
                <CopyToClipboard text={source.url}>
                    <button id={'source-card-copy-url'} className={'houshcka_demibold open-src-button'} onClick={(event) => event.stopPropagation()}>copy url</button>
                </CopyToClipboard>
                {showDelete ? <DeleteIcon onClick={handleDeleteSource} className={classes.deleteIconStyle} /> : ""}
            </CardActions>
        </Card>
    );
}
