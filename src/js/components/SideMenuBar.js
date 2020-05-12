import React, {Component} from "react";
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import makeStyles from "@material-ui/core/styles/makeStyles";

const classes = makeStyles({
    root: {
        width: 50,
        height: 50
    }
});
export default class SideMenuBar extends Component {
    constructor(props) {
        super(props);

        this.handleOpenDialog = this.handleOpenDialog.bind(this);
    }

    handleOpenDialog(event) {
        if (event.target.name === "newCategoryBtn") {
            this.props.handleOpenDialog("newCategory");
        } else if (event.target.name === "newSourceBtn") {
            this.props.handleOpenDialog("newSource");
        }
    }

    render() {
        return (<div className={"side_menu_bar"}>
            <AccountCircleIcon classes={{root: classes.root}}/>
            <button name={"newCategoryBtn"} onClick={this.handleOpenDialog}>Add Category</button>
            <button name={"newSourceBtn"} onClick={this.handleOpenDialog}>Add Source</button>
            <List dense>
                <ListItem>Jefferson</ListItem>
                <ListItem>Bernard</ListItem>
            </List>
        </div>)
    }
}