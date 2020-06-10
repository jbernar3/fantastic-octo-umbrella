import React from 'react';
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

    const getSourceImg = (source) => {
        if (source.source_urlImgFlag) {
            return (<div style={{backgroundImage: "url(" + props.source.source_urlImg + ")", border:'2px solid #a65cff',
                backgroundPosition: 'center', height: '23vh', width: '27%', backgroundSize: 'cover', marginTop: '-2.5vh', float: 'right',
                top: '50%', marginRight: '2.7%'}}>
            </div>);
        } else if (source.source_img === undefined) {
            return (<div className={classes.sourceimg}>
                <img src={'src/images/loadingclasifygif.gif'} alt={'clasify loading gif'} style={{width: '50%', height: '50%', marginTop: '-4%', marginLeft: '20%'}} />
            </div>);
        } else {
            console.log(source);
            return (<div className={classes.sourceimg}>
                <img src={`data:image/png;base64,${arrayBufferToBase64(props.source.source_img.data.data)}`}  alt={"temp source img"}
                     style={{width: '90%', height: '90%', border:'2px solid #a65cff', marginTop: '-8%'}}/>
            </div>);
        }
    };

    return (
        <Card className={classes.root} style={{borderRadius: 6}}>
            <CardContent>
                {props.drawerOpen ? <div className={'source_title'}>
                    {props.source.source_name.length > 55 ? props.source.source_name.substring(0, 55) + "..." : props.source.source_name}
                </div> :
                    <div className={'source_title'}>
                        {props.source.source_name.length > 75 ? props.source.source_name.substring(0, 75) + "..." : props.source.source_name}
                    </div>}

                <Typography className={classes.description} variant="body2" component="p">
                    On a narrow field surrounded by low-rise apartments, bus stops and a tangled
                    ribbon of highway ramps, the camel scampered past lions, which leapt against their
                    cage. It distracted the acrobats practicing their flips on an aerial hoop and
                    sauntered toward the languid, pregnant tiger, and stalls of horses and African
                    Watsui bulls.
                </Typography>
                {getSourceImg(props.source)}

            </CardContent>
            <CardActions>
                <Button size="small">Open Source</Button>
            </CardActions>
        </Card>
    );
}
