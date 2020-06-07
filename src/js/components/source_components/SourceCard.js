import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
    root: {
        minWidth: '80vh',
        backgroundColor: '#ececec',
        marginBottom: '2%',
        height: '30vh'
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
    },
    sourceimg: {
        float: 'right',
        width: '30%',
        display: 'inline-block',
    },
    pos: {
        marginBottom: 12,
    },
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

    return (
        <Card className={classes.root} style={{borderRadius: 6}}>
            <CardContent>
                <div className={'source_title'}>
                    {props.source.source_name}
                </div>
                <Typography className={classes.description} variant="body2" component="p">
                    On a narrow field surrounded by low-rise apartments, bus stops and a tangled
                    ribbon of highway ramps, the camel scampered past lions, which leapt against their
                    cage. It distracted the acrobats practicing their flips on an aerial hoop and
                    sauntered toward the languid, pregnant tiger, and stalls of horses and African
                    Watsui bulls.
                </Typography>
                <div className={classes.sourceimg}>
                    {props.source.source_urlImgFlag ?
                        <div style={{position: "relative"}}>
                            <img src={props.source.source_urlImg}  alt={"temp source img"} style={{width: '90%', position: 'absolute',
                                clip: 'rect(3.5vh, 40vh, 27vh, 0)', marginTop: '-15%'}}/>
                        </div>
                        : <img src={`data:image/png;base64,${arrayBufferToBase64(props.source.source_img.data.data)}`}  alt={"temp source img"}
                               style={{width: '90%', height: '90%', border:'2px solid #a65cff', marginTop: '-3.5vh'}}/>}
                </div>
            </CardContent>
            <CardActions>
                <Button size="small">Open Source</Button>
            </CardActions>
        </Card>
    );
}
