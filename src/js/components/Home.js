import React, {Component} from "react";
import {connect} from "react-redux";
import {signinUser, signoutUser} from "../../actions";

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleNewCategory = this.handleNewCategory.bind(this);
        this.handleNewSource = this.handleNewSource.bind(this);
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