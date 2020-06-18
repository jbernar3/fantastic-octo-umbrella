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
            indexCurrCat: 0
        };

        this.handleSetCategories = this.handleSetCategories.bind(this);
        this.addNewCategory = this.addNewCategory.bind(this);
        this.addNewSource = this.addNewSource.bind(this);
        this.setSourceImg = this.setSourceImg.bind(this);
        this.setCurrCatIndex = this.setCurrCatIndex.bind(this);
    }

    setCurrCatIndex(index) {
        this.setState({indexCurrCat: index});
    }

    addNewCategory(category) {
        this.setState({addCatOpen: false});
        this.state.categories.push(category);
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

    handleSetCategories() {
        if (this.props.location.state !== undefined && this.props.location.state.categories !== null) {
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
                    console.log("THIS IS GET CATEGORIES RESPONSE");
                    console.log(JSON.parse(xhr.response));
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
                <CategoryDrawer setCurrCatIndex={this.setCurrCatIndex} categories={this.state.categories} drawerOpen={this.state.drawerOpen}/>
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