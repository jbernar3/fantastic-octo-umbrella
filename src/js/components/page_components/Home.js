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
            drawerOpen: true,
            categories: [],
            firstRender: true
        };

        this.handleSetCategories = this.handleSetCategories.bind(this);
    }

    handleSetCategories() {
        if (this.props.location.state.categories !== null) {
            this.setState({categories: this.props.location.state.categories});
        } else {
            const postParameters = {
                userID: this.props.userID
            };

            const xhr = new XMLHttpRequest();
            xhr.addEventListener('load', () => {
                if (xhr.response === "error") {
                    console.log("handle get categories error");
                } else {
                    this.setState({categories: JSON.parse(xhr.response)});
                }
            });
            xhr.open('POST', 'http://localhost:3000/get_categories', false);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(postParameters));
        }
    }

    render() {
        const self = this;
        if (this.state.firstRender) {
            self.setState({firstRender : false});
            setTimeout(function cb() {
                self.handleSetCategories();
            }, 0);
        }
        return(
            <div>
                <MenuBar logout={this.props.logout} />
                <div style={{width: '100%', marginTop: '1.8vh'}}>
                    <div id={"classes_clickable_div"} onClick={() => {this.setState({drawerOpen: !this.state.drawerOpen})}}>
                        <img src={'src/images/menu_icon.png'} alt={'menu icon'} style={{width: '2vh', height: '2vh', marginRight: '1vh', marginLeft: '-1vh'}} />
                        classes
                    </div>
                    <div id={'new_class_div'}>+ Add Class</div>
                    <div id={'add_source_div'}>+ Add Source</div>
                    {/*<div id={"add_class_div"} onClick={() => {this.setState({drawerOpen: !this.state.drawerOpen})}}>+ add class</div>*/}
                </div>
                <CategoryDrawer categories={this.state.categories} drawerOpen={this.state.drawerOpen}/>
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