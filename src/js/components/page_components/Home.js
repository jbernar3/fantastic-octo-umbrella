import React, {Component} from "react";
import {connect} from "react-redux";
import {changeDisplayCategory, signoutUser, updateCategories} from "../../../actions";
import MenuBar from "../general_components/MenuBar";
import CategoryDrawer from "../category_components/CategoryDrawer";
import AddCategoryPopup from "../add_popups/AddCategoryPopup";
import AddSourcePopup from "../add_popups/AddSourcePopup";
import * as constants from "../../constants.js";
import EditCategoryPopup from "../add_popups/EditCategoryPopup";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: true,
            firstRender: true,
            addCatOpen: false,
            addSourceOpen: false,
            currCatID: 0,
            rootCategories: [],
            mapCategories: new Map(),
            mapSubcategories: new Map()
        };

        this.handleSetCategories = this.handleSetCategories.bind(this);
        this.addNewCategory = this.addNewCategory.bind(this);
        this.addNewSource = this.addNewSource.bind(this);
        this.setSourceImg = this.setSourceImg.bind(this);
        this.setCurrCatID = this.setCurrCatID.bind(this);
        this.handleEditSource = this.handleEditSource.bind(this);
        this.handleDeleteCat = this.handleDeleteCat.bind(this);
        this.handleDeleteSource = this.handleDeleteSource.bind(this);
        this.editClass = this.editClass.bind(this);
    }

    setCurrCatID(id) {
        this.setState({currCatID: id});
    }

    editClass(changedParent, catID, catName, parentID) {
        const tempCat = this.state.mapCategories.get(catID);
        if (tempCat) {
            console.log("IN THE IF STATEMENT: EDIT CLASS");
            tempCat.category_name = catName;
            if (changedParent) {
                console.log("IN IF STATEMENT IF CHANGED PARENT: EDIT CLASS");
                const oldParentID = tempCat.parent_id;
                tempCat.parent_id = parentID;
                if (parentID === '-1') {
                    this.state.rootCategories.push(catID);
                } else {
                    const tempSubcats = this.state.mapSubcategories.get(parentID) ? this.state.mapSubcategories.get(parentID) : [];
                    tempSubcats.push(catID);
                    this.state.mapSubcategories.set(parentID, tempSubcats);
                }
                if (this.state.mapSubcategories.get(oldParentID)) {
                    const tempSubcats = [];
                    this.state.mapSubcategories.get(oldParentID).forEach((subID) => {
                        if (subID !== catID) {
                            tempSubcats.push(subID);
                        }
                    });
                    this.state.mapSubcategories.set(oldParentID, tempSubcats);
                } else if (oldParentID === '-1') {
                    const tempRoots = [];
                    this.state.rootCategories.forEach((rootID) => {
                        if (rootID !== catID) {
                            tempRoots.push(rootID);
                        }
                    });
                    this.setState({rootCategories: tempRoots});
                }
            }
            this.state.mapCategories.set(catID, tempCat);
        }
    }

    addNewCategory(category, parentID) {
        this.setState({addCatOpen: false});
        this.state.mapCategories.set(category._id, category);
        if (parentID === -1) {
            this.state.rootCategories.push(category._id);
        } else {
            console.log("HELLO IM IN ADD NEW CATEGORY ELSE STATEMENT SUBCAT");
            let newSubCats = this.state.mapSubcategories.get(parentID);
            if (newSubCats === undefined) {
                newSubCats = [];
            }
            newSubCats.push(category._id);
            this.state.mapSubcategories.set(parentID, newSubCats);
        }
    }

    addNewSource(source, categoryID) {
        this.setState({addSourceOpen: false});
        if (this.state.mapCategories.get(categoryID)) {
            const newCat = this.state.mapCategories.get(categoryID);
            newCat.sources.unshift(source);
            this.state.mapCategories.set(categoryID, newCat);
        }
    }

    setSourceImg(img, categoryID, sourceID) {
        if (this.state.mapCategories.get(categoryID)) {
            const tempCat = this.state.mapCategories.get(categoryID);
            const tempSources = [];
            tempCat.sources.forEach((source) => {
                if (source._id.toString() === sourceID) {
                    const tempSource = source;
                    tempSource.source_img = img;
                    tempSources.push(tempSource);
                } else {
                    tempSources.push(source);
                }
            });
            tempCat.sources = tempSources;
            this.state.mapCategories.set(categoryID, tempCat);
        }
    }

    handleEditSource(categoryID, newSource) {
        let tempCategory = this.state.mapCategories.get(categoryID);
        if (tempCategory) {
            let tempSources = tempCategory.sources;
            for (let i=0; i<tempSources.length; i++) {
                if (newSource._id.toString() === tempSources[i]._id.toString()) {
                    tempSources[i].source_name = newSource.source_name;
                    tempSources[i].source_notes = newSource.source_notes;
                    tempCategory.sources = tempSources;
                    break;
                }
            }
            this.state.mapCategories.set(categoryID, tempCategory);
        }
    }

    handleDeleteCat(categoryID) {
        const parentID = this.state.mapCategories.get(categoryID).parent_id;
        this.state.mapCategories.delete(categoryID);
        const tempSubcats = this.state.mapSubcategories.get(categoryID);
        if (tempSubcats !== undefined) {
            tempSubcats.forEach((subCat) => this.handleDeleteCat(subCat));
            this.state.mapSubcategories.delete(categoryID);
        }
        if (parentID !== '-1') {
            const tempSubcatsParent = this.state.mapSubcategories.get(parentID);
            const indexSubcat = tempSubcatsParent.indexOf(categoryID);
            if (indexSubcat > -1) {
                tempSubcatsParent.splice(indexSubcat, 1);
            }
            this.state.mapSubcategories.set(parentID, tempSubcatsParent);
        } else {
            const indexCat = this.state.rootCategories.indexOf(categoryID);
            this.state.rootCategories.splice(indexCat, 1);
        }
    }

    handleDeleteSource(categoryID, sourceID) {
        if (this.state.mapCategories.get(categoryID)) {
            const tempCat = this.state.mapCategories.get(categoryID);
            const tempSources = [];
            tempCat.sources.forEach((source) => {
                if (source._id.toString() !== sourceID) {
                    tempSources.push(source);
                }
            });
            tempCat.sources = tempSources;
            this.state.mapCategories.set(categoryID, tempCat);
        }
    }

    handleSetCategories() {
        const postParameters = {
            userID: this.props.userID
        };

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.response === "error") {
                console.log("handle get categories error");
            } else {
                const categories = JSON.parse(xhr.response);
                const mapSubcategories = new Map();
                const mapCategories = new Map();
                const rootCategories = [];
                categories.forEach((category) => {
                    mapCategories.set(category._id, category);
                    if (category.parent_id === '-1') {
                        rootCategories.push(category._id);
                    } else if (mapSubcategories.has(category.parent_id)) {
                        const newSubCats = mapSubcategories.get(category.parent_id);
                        newSubCats.push(category._id);
                        mapSubcategories.set(category.parent_id, newSubCats);
                    } else {
                        mapSubcategories.set(category.parent_id, [category._id]);
                    }
                });
                this.setState({mapCategories: mapCategories,
                    mapSubcategories: mapSubcategories, rootCategories: rootCategories});
            }
        });
        // xhr.open('POST', 'http://localhost:3000/get_categories', false);
        xhr.open('POST', constants.HOST_NAME + 'get_categories', false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(postParameters));

    }

    render() {
        const self = this;
        if (this.state.firstRender) {
            self.setState({firstRender : false});
            setTimeout(function cb() {
                self.handleSetCategories();
            }, 500);
        }
        return(
            <div>
                <MenuBar logout={this.props.logout} mapCategories={this.state.mapCategories} />
                <div style={{width: '100%', marginTop: '1.8vh'}}>
                    <div id={"classes_clickable_div"} onClick={() => {this.setState({drawerOpen: !this.state.drawerOpen})}}>
                        <img src={'src/images/menu_icon.png'} alt={'menu icon'} style={{width: '2vh', height: '2vh', marginRight: '1vh', marginLeft: '-1vh'}} />
                        classes
                    </div>
                    <div id={'new_class_div'} onClick={() => this.setState({addCatOpen: true})}>+ Add Class</div>
                    <div id={'add_source_div'} onClick={() => this.setState({addSourceOpen: true})}>+ Add Source</div>
                    {this.state.mapCategories !== undefined ?
                            <AddCategoryPopup userID={this.props.userID} popupOpen={this.state.addCatOpen} handleClose={() => this.setState({addCatOpen: false})}
                                              mapCategories={this.state.mapCategories} rootCategories={this.state.rootCategories} mapSubcategories={this.state.mapSubcategories}
                                              addNewCategory={this.addNewCategory} currCatID={this.state.currCatID} />
                    : ""}
                    {this.state.mapCategories !== undefined ? <AddSourcePopup userID={this.props.userID} popupOpen={this.state.addSourceOpen} handleClose={() => this.setState({addSourceOpen: false})}
                                                                              mapCategories={this.state.mapCategories} rootCategories={this.state.rootCategories} mapSubcategories={this.state.mapSubcategories}
                                                                           addNewSource={this.addNewSource} setSourceImg={this.setSourceImg} currCatID={this.state.currCatID} />
                        : ""}
                </div>
                <CategoryDrawer setCurrCatID={this.setCurrCatID} editClass={this.editClass}
                                rootCategories={this.state.rootCategories} mapCategories={this.state.mapCategories}
                                mapSubcategories={this.state.mapSubcategories} drawerOpen={this.state.drawerOpen}
                                userID={this.props.userID} handleEditSource={this.handleEditSource} handleDeleteCat={this.handleDeleteCat}
                                handleDeleteSource={this.handleDeleteSource}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userID: state.signin.userID,
        firstName: state.signin.firstName,
        lastName: state.signin.lastName,
        profileImg: state.signin.profileImg
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