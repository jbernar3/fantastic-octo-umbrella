import React from "react";
import {connect} from "react-redux";
import MenuBar from "../general_components/MenuBar";
import {changeDisplayCategory, signoutUser, updateCategories} from "../../../actions";
import SideBar from "../general_components/SideBar";
import Button from "@material-ui/core/Button";
import SourceCard from "../source_components/SourceCard";
import Scrollbars from "react-scrollbars-custom";
import NewSourcePopup from "../add_popups/NewSourcePopup";
import Dialog from "@material-ui/core/Dialog";
import EditProfilePopup from "../add_popups/EditProfilePopup";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editOpen: false,
        };
    }


    render() {
        return ( <div className={"main_content"}>
                    <div className={"first-half-profile"}>
                        <Button style={{color: '#a65cff', fontFamily: 'houschka-rounded,sans-serif', fontWeight: 600,
                            fontStyle: 'normal', textTransform: 'none', fontSize: '1.5vw', float: 'left'}}>home</Button>
                        <Button style={{color: '#a65cff', fontFamily: 'houschka-rounded,sans-serif', fontWeight: 600,
                            fontStyle: 'normal', textTransform: 'none', fontSize: '1.5vw', float: 'right'}} onClick={() => {this.setState({editOpen: true})}}>edit profile</Button>
                        <img src={'src/images/c-logo.png'} alt={'c logo'} id={'profile-c-logo'} />
                        <div className={'profile-name'}>Pop Smoke</div>
                        <Scrollbars
                            style={{ height: '36%', margin: '5vh auto auto', width: '70%' }}
                            id='source_scroll_div'
                            thumbYProps={{ className: "thumbY" }}
                            trackXProps={{ className: "trackX" }}
                        >
                            <div className={'profile-description'}>Bashar Barakah Jackson (July 20, 1999 – February 19, 2020),[4][2] known professionally as Pop Smoke,
                                was an American rapper and songwriter. He was signed to Victor Victor Worldwide and Republic Records.
                                Pop Smoke rose to popularity for leading the Brooklyn drill sound.[6] In April 2019, he released the song "Welcome to the Party",[7] the lead single of his debut mixtape Meet the Woo, which was released in July 2019. "Welcome to the Party" was made into two remixes featuring American rapper Nicki Minaj and British rapper Skepta in August 2019.[8]

                                In October 2019, he featured American rapper Lil Tjay on his single "War". In December 2019, he featured American rapper Calboy on his single "100k on a Coupe" and also collaborated with Travis Scott a few weeks later on the song "Gatti", from Scott and his Cactus Jack members' compilation album, JackBoys (2019).[9] "Gatti" became his first Billboard Hot 100 charting song, peaking at 69, a week after the release of JackBoys.[10] In February 2020, he released his second mixtape Meet the Woo 2, containing features from Quavo, A Boogie wit da Hoodie, Fivio Foreign, and Lil Tjay. In the week following his death, his single "Dior" entered the Billboard Hot 100 and peaked at number 30. Pop Smoke's debut studio album is expected to be released on June 12, 2020.
                            </div>
                        </Scrollbars>
                        <EditProfilePopup editOpen={this.state.editOpen} handleClose={() => {this.setState({editOpen: false})}}/>
                    </div>
                    <div className={'second-half-profile'}>second half</div>
                </div>);
    }
}

function mapStateToProps(state) {
    return {
        userID: state.signin.userID,
        firstName: state.signin.firstName,
        lastName: state.signin.lastName,
        numCategories: state.signin.categories.length,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: () => {
            dispatch(signoutUser())
        }
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer