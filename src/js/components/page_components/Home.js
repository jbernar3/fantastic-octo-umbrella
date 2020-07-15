import React, {Component} from "react";
import {connect} from "react-redux";
import {changeDisplayCategory, signoutUser, updateCategories} from "../../../actions";
import MenuBar from "../general_components/MenuBar";
import CategoryDrawer from "../category_components/CategoryDrawer";
import AddCategoryPopup from "../add_popups/AddCategoryPopup";
import AddSourcePopup from "../add_popups/AddSourcePopup";
import Button from "@material-ui/core/Button";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: true,
            categories: undefined,
            firstRender: true,
            addCatOpen: false,
            addSourceOpen: false,
            indexCurrCat: 0,
            rootCategories: [],
            mapCategories: new Map(),
            mapSubcategories: new Map()
        };

        this.handleSetCategories = this.handleSetCategories.bind(this);
        this.addNewCategory = this.addNewCategory.bind(this);
        this.addNewSource = this.addNewSource.bind(this);
        this.setSourceImg = this.setSourceImg.bind(this);
        this.setCurrCatIndex = this.setCurrCatIndex.bind(this);
        this.handleEditSource = this.handleEditSource.bind(this);
    }

    setCurrCatIndex(index) {
        this.setState({indexCurrCat: index});
    }

    addNewCategory(category, parentID) {
        this.setState({addCatOpen: false});
        this.state.categories.push(category);
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
        for (let i=0; i<this.state.categories.length; i++) {
            if (this.state.categories[i]._id === categoryID) {
                this.state.categories[i].sources.push(source);
                break;
            }
        }
    }

    setSourceImg(img, categoryID, sourceID) {
        const updatedCategories = this.state.categories.map((category, i) => {
            if (category._id.toString() === categoryID) {
                const copyCategory = category;
                copyCategory.sources = category.sources.map((source, j) => {
                    if (source._id.toString() === sourceID) {
                        const copySource = source;
                        copySource.source_img = img;
                        return copySource;
                    } else {
                        return source;
                    }
                });
                return copyCategory;
            } else {
                return category;
            }
        });
        this.setState({categories: updatedCategories});
    }

    handleEditSource(categoryID, newSource) {
        let tempCategory = this.state.mapCategories.get(categoryID);
        if (tempCategory) {
            let tempSources = tempCategory.sources;
            for (let i=0; i<tempSources.length; i++) {
                if (newSource._id === tempSources[i]._id) {
                    tempSources[i] = newSource;
                    break;
                }
            }
            this.state.mapCategories.set(categoryID, tempCategory);
        }
    }

    handleSetCategories() {
        // if (this.props.location.state !== undefined && this.props.location.state.categories !== null) {
        //     this.setState({categories: this.props.location.state.categories});
        // } else {
        const postParameters = {
            userID: this.props.userID
        };

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.response === "error") {
                console.log("handle get categories error");
            } else {
                console.log("THIS IS GET CATEGORIES RESPONSE");
                console.log(JSON.parse(xhr.response));
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
                // let tempCats = categories;
                // while (tempCats.length !== 0) {
                //     let newTempCats = [];
                //     tempCats.forEach((category) => {
                //         if (category.parent_id === '-1') {
                //             category.subcategories = new Map();
                //             rootCategories.set(category._id, category);
                //             mapParentIDs.set(category._id, category.parent_id);
                //         } else if (mapParentIDs.has(category.parent_id)) {
                //             category.subcategories = [];
                //             mapParentIDs.set(category._id, category.parent_id);
                //             const pathParents = [];
                //             let parentCat = category.parent_id;
                //             while (parentCat !== -1) {
                //                 pathParents.push(parentCat);
                //                 parentCat = mapParentIDs.get(parentCat);
                //             }
                //             const rootCat = rootCategories.get(pathParents[pathParents.length-1]);
                //             let prevCat = rootCat;
                //             for (let i=pathParents.length-2; i>=0; i--) {
                //                 // get root category to change and add it back into the og map
                //                 prevCat = prevCat.subcategories.get(pathParents[i]);
                //             }
                //         } else {
                //             newTempCats.push(category);
                //             console.log("PUSHED TO TEMP CATS");
                //         }
                //     });
                //     tempCats = newTempCats;
                // }
                console.log("THIS IS ROOT CATEGORIES");
                console.log(rootCategories);
                this.setState({categories: JSON.parse(xhr.response), mapCategories: mapCategories,
                    mapSubcategories: mapSubcategories, rootCategories: rootCategories});
            }
        });
        xhr.open('POST', 'http://localhost:3000/get_categories', false);
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
                <MenuBar logout={this.props.logout} categories={this.state.categories} />
                <div style={{width: '100%', marginTop: '1.8vh'}}>
                    <div id={"classes_clickable_div"} onClick={() => {this.setState({drawerOpen: !this.state.drawerOpen})}}>
                        <img src={'src/images/menu_icon.png'} alt={'menu icon'} style={{width: '2vh', height: '2vh', marginRight: '1vh', marginLeft: '-1vh'}} />
                        classes
                    </div>
                    {/*<Button style={{*/}
                    {/*    fontFamily: 'houschka-rounded,sans-serif',*/}
                    {/*    fontWeight: 400,*/}
                    {/*    fontStyle: 'normal',*/}
                    {/*    color: '#a65cff',*/}
                    {/*    marginTop: '1vh',*/}
                    {/*    textTransform: 'none'}} onClick={() => this.setState({addCatOpen: true})}>+ Add Class</Button>*/}
                    <div id={'new_class_div'} onClick={() => this.setState({addCatOpen: true})}>+ Add Class</div>
                    <div id={'add_source_div'} onClick={() => this.setState({addSourceOpen: true})}>+ Add Source</div>
                    {this.state.categories !== undefined ? <AddCategoryPopup userID={this.props.userID} popupOpen={this.state.addCatOpen} handleClose={() => this.setState({addCatOpen: false})}
                                                                             categories={this.state.categories} addNewCategory={this.addNewCategory} currCatIndex={this.state.indexCurrCat} />
                    : ""}
                    {this.state.categories !== undefined ? <AddSourcePopup userID={this.props.userID} popupOpen={this.state.addSourceOpen} handleClose={() => this.setState({addSourceOpen: false})}
                                                                           categories={this.state.categories} addNewSource={this.addNewSource} setSourceImg={this.setSourceImg} currCatIndex={this.state.indexCurrCat} />
                        : ""}
                </div>
                <CategoryDrawer setCurrCatIndex={this.setCurrCatIndex} categories={this.state.categories}
                                rootCategories={this.state.rootCategories} mapCategories={this.state.mapCategories}
                                mapSubcategories={this.state.mapSubcategories} drawerOpen={this.state.drawerOpen}
                                userID={this.props.userID} handleEditSource={this.handleEditSource}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userID: state.signin.userID,
        firstName: state.signin.firstName,
        lastName: state.signin.lastName,
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