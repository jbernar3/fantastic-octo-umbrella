import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles({
    root: {
        //maxWidth: '30%'
        width: 400
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
        fontSize: 12
    },
    cardAction: {
        display: 'block',
        textAlign: 'initial',
        width: '100%',
        height: '100%'
    },
    cardContent: {
        width: '100%',
        height: '100%'
    }
});

export default function CategoryDisplay(props) {
    const classes = useStyles();
    const [isHover, setHover] = React.useState(false);

    const handleOpenDialog = (event) => {
        event.persist();
        props.openClick(props.index);
    };

    const toggleHover = (event) => {
        event.persist();
        setHover(!isHover);
    };

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    return (
        <Card className={classes.root} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            <ButtonBase className={classes.cardAction} onClick={handleOpenDialog}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {props.categoryName}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Created on 4/5/66
                    </Typography>
                    <Typography variant="body2" component="p">
                        {props.sources.map(function(source, index) {
                            console.log("LOAD SOURCE");
                            console.log(index);
                            return <div>
                                {console.log(source)}
                                {source.source_name} <br />
                                {source.source_urlImgFlag ?
                                    <img src={source.source_urlImg}  alt={"temp source img"}/>
                                    : <img src={`data:image/png;base64,${arrayBufferToBase64(source.source_img.data.data)}`}  alt={"temp source img"}/>}
                            </div>
                        })}
                    </Typography>
                </CardContent>
            </ButtonBase>
            {/*<CardActions>*/}
            {/*    <Button size="small" onClick={handleOpenDialog}>Learn More</Button>*/}
            {/*</CardActions>*/}
        </Card>
    );
}
