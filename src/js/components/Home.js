import React, {Component} from "react";
import {connect} from "react-redux";
import {signinUser, signoutUser} from "../../actions";
import TextField from '@material-ui/core/TextField'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCategoryField: "",
            newSourceField: ""
        };
        this.handleNewCategory = this.handleNewCategory.bind(this);
        this.handleNewSource = this.handleNewSource.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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

    handleNewCategory() {
        const postParameters = {
            userID: this.props.userID,
            catName: "Machine Learning"
        };

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            console.log(xhr.response);
        });
        xhr.open('POST', 'http://localhost:3000/new_category', false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(postParameters));
    }

    handleNewSource() {
        const postParameters = {
            userID: this.props.userID,
            categoryID: "5eb9894bdb432a16a07f38ef",
            url: "youtube.com"
        };

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            console.log(xhr.response);
        });
        xhr.open('POST', 'http://localhost:3000/new_source', false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(postParameters));
    }

    render() {
        return(
            <div>This is home page, {this.props.firstName}
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
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userID: state.signin.userID,
        firstName: state.signin.firstName
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: () => {
            dispatch(signoutUser())
        }
    }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer