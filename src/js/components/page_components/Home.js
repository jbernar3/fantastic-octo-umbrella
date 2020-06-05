import React, {Component} from "react";
import {connect} from "react-redux";
import {changeDisplayCategory, signinUser, signoutUser, toggleDisplayCategory, updateCategories} from "../../../actions";
import TextField from '@material-ui/core/TextField'
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import NewCategoryPopup from "../add_popups/NewCategoryPopup";
import NewSourcePopup from "../add_popups/NewSourcePopup";
import CategoryDisplayPopup from "../category_components/CategoryDisplayPopup";
import MenuBar from "../general_components/MenuBar";
import CategoryDisplay from "../category_components/CategoryDisplay";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import SideBar from "../general_components/SideBar";
import CategoryDrawer from "../category_components/CategoryDrawer";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        }
    }

    render() {
        return(
            <div>
                <MenuBar logout={this.props.logout} />
                <div style={{width: '100%', marginTop: '2%'}}>
                    <div id={"classes_clickable_div"} onClick={() => {this.setState({drawerOpen: !this.state.drawerOpen})}}>classes</div>
                    <div id={"add_class_div"} onClick={() => {this.setState({drawerOpen: !this.state.drawerOpen})}}>+ add class</div>
                </div>
                <CategoryDrawer drawerOpen={this.state.drawerOpen}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userID: state.signin.userID,
        firstName: state.signin.firstName,
        indexDisplayCategory: state.signin.indexDisplayCategory
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => {
            dispatch(signoutUser())
        },
        updateCategories: (categories) => {
            dispatch(updateCategories(categories))
        },
        changeDisplayCategory: (index) => {
            dispatch(changeDisplayCategory(index))
        },
        closeDisplayCategory: () => {
            dispatch(changeDisplayCategory(-1))
        }
    }
}

const OldHomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default OldHomeContainer