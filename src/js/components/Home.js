import React, {Component} from "react";
import {connect} from "react-redux";
import {signinUser, signoutUser, updateCategories} from "../../actions";
import TextField from '@material-ui/core/TextField'
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SideMenuBar from "./SideMenuBar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import NewCategoryPopup from "./NewCategoryPopup";

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

    handleNewSource() {
        const postParameters = {
            userID: this.props.userID,
            categoryID: this.state.categorySelectID,
            url: this.state.newSourceField
        };
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.response === "error") {
                console.log("handle new category error");
            } else {
                this.props.updateCategories(JSON.parse(xhr.response));
            }
        });
        xhr.open('POST', 'http://localhost:3000/new_source', false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(postParameters));
    }

    handleCategoryChange(event) {
        this.setState({categorySelect: event.target.value,
            categorySelectID: this.props.categories[parseInt(event.target.value.substring(0,1))].category_id}, () => {console.log(this.state.categorySelectID)})
    }


    render() {
        return(
            <div className={"main_content"}>
                <Dialog name={"newCategory"} open={this.state.openAddCategoryDialog} onClose={this.handleCloseNewCatDialog} aria-labelledby="form-dialog-title">
                    <NewCategoryPopup handleSubmit={this.handleNewCategory} />
                </Dialog>
                <Dialog name={"newSource"} open={this.state.openAddSourceDialog} onClose={this.handleCloseNewSourceDialog} aria-labelledby="form-dialog-title">Add Source</Dialog>
                <SideMenuBar handleOpenDialog={this.handleOpenDialog} handleCloseDialog={this.handleCloseDialog} />
                This is home page, {this.props.firstName}
                <TextField id="new_category"
                           label="New Category"
                           name="new_category"
                           autoComplete="new_category"
                           autoFocus
                           value={this.state.newCategoryField}
                           onChange={this.handleInputChange}
                />
                <TextField id="new_source"
                           label="New Source"
                           name="new_source"
                           autoComplete="new_source"
                           autoFocus
                           value={this.state.newSourceField}
                           onChange={this.handleInputChange}
                />
                <button onClick={this.props.logOut}>Log Out</button>
                <button onClick={this.handleNewCategory}>Add Category</button>
                <button onClick={this.handleNewSource}>Add Source</button>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.categorySelect}
                    onChange={this.handleCategoryChange}
                >
                    {this.props.categories.map(function(category, index) {
                        return <MenuItem key={index} value={index + category.category_name}>{category.category_name}</MenuItem>
                    })}
                </Select>
                {this.props.categories.map(function(category, index) {
                    return <div>{category.category_name}
                        {category.sources.map(function(source, index) {
                            return <div>{source.source_name}</div>
                        })}</div>
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userID: state.signin.userID,
        firstName: state.signin.firstName,
        categories: state.signin.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: () => {
            dispatch(signoutUser())
        },
        updateCategories: (categories) => {
            console.log("IN UPDATE CATEGORIES");
            console.log(categories);
            dispatch(updateCategories(categories))
        }
    }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer