import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from "@material-ui/core/CardMedia";
import {Image} from "@material-ui/icons";

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
    }
});

export default function SourceCard(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [source, setSource] = React.useState(props.source);

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    const moreUpperCaseChar = (str) => {
        let counter = 0;
        let sizeStr = str.length;
        for (let i=0; i<sizeStr; i++) {
            if (str[i] === str[i].toUpperCase()) {
                counter += 1;
            }
        }
        return ((sizeStr / 2) <= counter);
    };

    const handleClick = (event, name) => {
        if (name === 'open-button') {
            window.open(source.url,'_blank');
            event.stopPropagation();
        } else if (name === 'source-card') {
            props.openSourcePopup();
        }
        console.log(name);
    };

    useEffect(
        () => { setSource(props.source); },
        [props.source]);

    const getSourceImg = (source) => {
        if (source.source_urlImgFlag) {
            let styleImg = {backgroundImage: "url(" + props.source.source_urlImg + ")", border:'2px solid #a65cff',
                backgroundPosition: 'center', height: '23vh', width: '27%', backgroundSize: 'cover', marginTop: '-2.5vh', float: 'right',
                top: '50%', marginRight: '2.7%'};
            if (!props.drawerOpen) {
                styleImg = {backgroundImage: "url(" + props.source.source_urlImg + ")", border:'2px solid #a65cff',
                    backgroundPosition: 'center', height: '23vh', width: '21.2%', backgroundSize: 'cover', marginTop: '-2.5vh', float: 'right',
                    top: '50%', marginRight: '5%'}
            }
            return (<div style={styleImg}>
            </div>);
        } else if (source.source_img === undefined) {
            let styleGif = {width: '50%', height: '50%', marginTop: '-4%', marginLeft: '20%'};
            if (!props.drawerOpen) {
                styleGif = {width: '50%', height: '50%', marginTop: '-8.3%', marginLeft: '23%'};
            }
            return (<div className={classes.sourceimg}>
                <img src={'src/images/loadingclasifygif.gif'} alt={'clasify loading gif'} style={styleGif} />
            </div>);
        } else {
            let styleImg = {width: '90%', height: '90%', border:'2px solid #a65cff', marginTop: '-8%'};
            if (!props.drawerOpen) {
                styleImg = {width: '70%', height: '70%', border:'2px solid #a65cff', marginTop: '-6%', marginLeft: '12%'};
            }
            return (<div className={classes.sourceimg}>
                <img src={`data:image/png;base64,${arrayBufferToBase64(source.source_img.data.data)}`}  alt={"temp source img"}
                     style={styleImg}/>
            </div>);
        }
    };

    return (
        <Card name={'source-card'} className={classes.root} style={{borderRadius: 6}} onClick={(event) => handleClick(event, 'source-card')}>
            <CardContent>
                {props.drawerOpen ? <div className={'source_title'}>
                    {source.source_name.length > 55 ? source.source_name.substring(0, 55) + "..." : source.source_name}
                </div> :
                    <div className={'source_title'}>
                        {source.source_name.length > 75 ? source.source_name.substring(0, 75) + "..." : source.source_name}
                    </div>}

                <Typography className={classes.description} variant="body2" component="p">
                    On a narrow field surrounded by low-rise apartments, bus stops and a tangled
                    ribbon of highway ramps, the camel scampered past lions, which leapt against their
                    cage. It distracted the acrobats practicing their flips on an aerial hoop and
                    sauntered toward the languid, pregnant tiger, and stalls of horses and African
                    Watsui bulls.
                </Typography>
                {getSourceImg(source)}

            </CardContent>
            <CardActions>
                {/*<Button size="small" onClick={() => {window.open('http://google.com','_blank')}}>Open Source</Button>*/}
                <Button size="small" onClick={(event) => handleClick(event,'open-button')}>Open Source</Button>
            </CardActions>
        </Card>
    );
}
