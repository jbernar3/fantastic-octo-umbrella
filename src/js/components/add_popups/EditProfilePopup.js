import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

export default function EditProfilePopup(props) {
    const [open, setOpen] = React.useState(false);


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
                        <input className={'text-input-profile'} style={{float: 'left', marginLeft: '63px'}} />
                        <input className={'text-input-profile'} style={{float: 'right', marginRight: '63px'}} />
                        {/*<div className={'text-input-profile-description'} style={{float: 'left', marginLeft: '65px'}}>email address</div>*/}
                        {/*<div className={'text-input-profile-description'} style={{float: 'right', marginRight: '150px'}}>password</div>*/}
                        {/*<input className={'text-input-profile'} style={{float: 'left', marginLeft: '63px'}} />*/}
                        {/*<input className={'text-input-profile'} style={{float: 'right', marginRight: '63px'}} />*/}
                        <div id={'bio-input-profile-description'} style={{float: 'left', marginLeft: '65px'}}>bio (250 characters max)</div>
                        <textarea id={'edit-bio-input'} style={{float: 'left', marginLeft: '63px', cols: '40', rows: '5'}} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
