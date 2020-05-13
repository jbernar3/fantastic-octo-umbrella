import React, {Component} from "react";
import {connect} from "react-redux";
import {changeDisplayCategory, signinUser, signoutUser, toggleDisplayCategory, updateCategories} from "../../actions";
import TextField from '@material-ui/core/TextField'
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SideMenuBar from "./SideMenuBar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import NewCategoryPopup from "./NewCategoryPopup";
import NewSourcePopup from "./NewSourcePopup";
import CategoryDisplayPopup from "./CategoryDisplayPopup";
import MenuBar from "./MenuBar";
import CategoryDisplay from "./CategoryDisplay";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import SideBar from "./SideBar";

const classes = makeStyles({
    root: {
        flexGrow: 1,
    },
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCategoryField: "",
            newSourceField: "",
            categorySelect: "",
            categorySelectID: "",
            openAddCategoryDialog: false,
            openAddSourceDialog: false
        };
        this.handleNewCategory = this.handleNewCategory.bind(this);
        this.handleNewSource = this.handleNewSource.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseNewCatDialog = this.handleCloseNewCatDialog.bind(this);
        this.handleCloseNewSourceDialog = this.handleCloseNewSourceDialog.bind(this);
        this.handleCategoryDisplay = this.handleCategoryDisplay.bind(this);
        this.handleCategoryDisplayClose = this.handleCategoryDisplayClose.bind(this);
    }

    handleOpenDialog(dialogName) {
        if (dialogName === "newCategory") {
            this.setState({openAddCategoryDialog: true});
        } else if (dialogName === "newSource") {
            this.setState({openAddSourceDialog: true});
        }
    }

    handleCloseNewCatDialog() {
        this.setState({openAddCategoryDialog: false});
    }

    handleCloseNewSourceDialog() {
        this.setState({openAddSourceDialog: false});
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        if (name=== "new_category") {
            this.setState({newCategoryField: value});
        } else if (name === "new_source") {
            this.setState({newSourceField: value});
        }
    }

    handleNewCategory(categoryName) {
        const postParameters = {
            userID: this.props.userID,
            catName: categoryName
        };

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.response === "error") {
                console.log("handle new category error");
            } else {
                this.props.updateCategories(JSON.parse(xhr.response));
                this.setState({openAddCategoryDialog: false});
            }
        });
        xhr.open('POST', 'http://localhost:3000/new_category', false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(postParameters));
    }

    handleNewSource(sourceURL, sourceTitle, categoryID) {
        const postParameters = {
            userID: this.props.userID,
            categoryID: categoryID,
            url: sourceURL,
            sourceTitle: sourceTitle
        };
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.response === "error") {
                console.log("handle new source error");
            } else {
                this.props.updateCategories(JSON.parse(xhr.response));
                this.setState({openAddSourceDialog: false});
            }
        });
        xhr.open('POST', 'http://localhost:3000/new_source', false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(postParameters));
    }

    handleCategoryChange(event) {
        event.persist();
        this.setState({categorySelect: event.target.value,
            categorySelectID: this.props.categories[parseInt(event.target.value.substring(0,1))].category_id}, () => {console.log(this.state.categorySelectID)})
    }

    handleCategoryDisplay(index) {
        console.log("IN HANDLE CATEGORY DISPLAY");
        this.props.changeDisplayCategory(index);
    }

    handleCategoryDisplayClose(event) {
        event.persist();
        this.props.closeDisplayCategory();
    }

    render() {
        const self = this;
        return(
            <div className={"main_content"}>
                <Dialog name={"newCategory"} open={this.state.openAddCategoryDialog} onClose={this.handleCloseNewCatDialog} aria-labelledby="form-dialog-title">
                    <NewCategoryPopup handleSubmit={this.handleNewCategory} />
                </Dialog>
                <Dialog name={"newSource"} open={this.state.openAddSourceDialog} onClose={this.handleCloseNewSourceDialog} aria-labelledby="form-dialog-title">
                    <NewSourcePopup categories={this.props.categories} handleSubmit={this.handleNewSource} />
                </Dialog>
                <MenuBar userName={this.props.firstName} logOut={this.props.logOut} />
                <SideBar />
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={5}>
                            {this.props.categories.map(function(category, index) {
                                return  <Grid key={index} item>
                                    <CategoryDisplay index={index} openClick={self.handleCategoryDisplay} categoryName={category.category_name} sources={category.sources}/>
                                    <CategoryDisplayPopup dialogOpen={self.props.indexDisplayCategory === index}  onClose={self.handleCategoryDisplay}
                                                          categoryName={category.category_name} sources={category.sources} />
                                </Grid>})}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userID: state.signin.userID,
        firstName: state.signin.firstName,
        categories: state.signin.categories,
        indexDisplayCategory: state.signin.indexDisplayCategory
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: () => {
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

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer