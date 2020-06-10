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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

export default function EditProfilePopup(props) {
    const [open, setOpen] = React.useState(false);
    const [updatedFName, setFName] = React.useState("Pop");
    const [updatedLName, setLName] = React.useState("Smoke");
    const [updatedBio, setBio] = React.useState("a;slkdfj;alskdjf;laksd");

    const handleInputChange = (event) => {
        const eventName = event.target.name;
        console.log(event.target.name);
        const eventValue = event.target.value;
        if (eventName === "fName") {
            setFName(eventValue);
        } else if (eventName === "lName") {
            setLName(eventValue);
        } else if (eventName === "bio") {
            setBio(eventValue);
        }
    };


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={props.editOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                {/*<DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>*/}
                {/*<DialogContent>*/}
                {/*    <DialogContentText id="alert-dialog-slide-description">*/}
                {/*        Let Google help apps determine location. This means sending anonymous location data to*/}
                {/*        Google, even when no apps are running.*/}
                {/*    </DialogContentText>*/}
                {/*</DialogContent>*/}
                {/*<DialogActions>*/}
                {/*    <Button onClick={handleClose} color="primary">*/}
                {/*        Disagree*/}
                {/*    </Button>*/}
                {/*    <Button onClick={handleClose} color="primary">*/}
                {/*        Agree*/}
                {/*    </Button>*/}
                {/*</DialogActions>*/}
                <div id={'edit-profile-popup'}>
                    <img src={'src/images/c-logo.png'} alt={'profile icon'} style={{margin: '70px 240px auto', width: '70px'}}/>
                    <div id={'edit-profile-inputs-div'}>
                        <div className={'text-input-profile-description'} style={{float: 'left', marginLeft: '65px'}}>first name</div>
                        <div className={'text-input-profile-description'} style={{float: 'right', marginRight: '150px'}}>last name</div>
                        <input name={'fName'} onChange={handleInputChange} className={'text-input-profile'} style={{float: 'left', marginLeft: '63px'}} value={updatedFName} />
                        <input name={'lName'} onChange={handleInputChange} className={'text-input-profile'} style={{float: 'right', marginRight: '63px'}} value={updatedLName}/>
                        {/*<div className={'text-input-profile-description'} style={{float: 'left', marginLeft: '65px'}}>email address</div>*/}
                        {/*<div className={'text-input-profile-description'} style={{float: 'right', marginRight: '150px'}}>password</div>*/}
                        {/*<input className={'text-input-profile'} style={{float: 'left', marginLeft: '63px'}} />*/}
                        {/*<input className={'text-input-profile'} style={{float: 'right', marginRight: '63px'}} />*/}
                        <div id={'bio-input-profile-description'} style={{float: 'left', marginLeft: '65px'}}>bio (250 characters max)</div>
                        {/*<textarea id={'edit-bio-input'} style={{float: 'left', marginLeft: '63px', cols: '40', rows: '5'}}>*/}
                        {/*    Bashar Barakah Jackson (July 20, 1999 – February 19, 2020),[4][2] known professionally as Pop Smoke,*/}
                        {/*        was an American rapper and songwriter. He was signed to Victor Victor Worldwide and Republic Records.*/}
                        {/*        Pop Smoke rose to popularity for leading the Brooklyn drill sound.[6] In April 2019, he released the song "Welcome to the Party",[7] the lead single of his debut mixtape Meet the Woo, which was released in July 2019. "Welcome to the Party" was made into two remixes featuring American rapper Nicki Minaj and British rapper Skepta in August 2019.[8]*/}

                        {/*        In October 2019, he featured American rapper Lil Tjay on his single "War". In December 2019, he featured American rapper Calboy on his single "100k on a Coupe" and also collaborated with Travis Scott a few weeks later on the song "Gatti", from Scott and his Cactus Jack members' compilation album, JackBoys (2019).[9] "Gatti" became his first Billboard Hot 100 charting song, peaking at 69, a week after the release of JackBoys.[10] In February 2020, he released his second mixtape Meet the Woo 2, containing features from Quavo, A Boogie wit da Hoodie, Fivio Foreign, and Lil Tjay. In the week following his death, his single "Dior" entered the Billboard Hot 100 and peaked at number 30. Pop Smoke's debut studio album is expected to be released on June 12, 2020.*/}
                        {/*</textarea>*/}

                    </div>
                    <Scrollbars
                        style={{ width: '450px', height: '220px', marginLeft: '63px', marginTop: '124px' }}
                        //id='source_scroll_div'
                        thumbYProps={{ className: "thumbY" }}
                        trackXProps={{ className: "trackX" }}
                    >

                        {/*<textarea id={'edit-bio-input'} onChange={handleInputChange} name={'bio'} value={updatedBio} style={{float: 'left', cols: '40', rows: '5'}} />*/}
                        <TextField name={'bio'} value={updatedBio} variant={'outlined'} multiline onChange={handleInputChange}
                                   style={{outline: 'none', borderRadius: '7px', backgroundColor: 'rgba(166, 92, 254, 0.09)',
                                       border: 'none', width: '430px', fontFamily: 'houschka-rounded,sans-serif',
                                       fontWeight: 600, fontStyle: 'normal', fontSize: '13pt', color: '#a65cff'}}/>
                    </Scrollbars>
                    <Button id={'update-profile-btn'}>Update Profile</Button>
                </div>
            </Dialog>
        </div>
    );
}
