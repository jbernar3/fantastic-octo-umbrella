import { connect } from 'react-redux'
import { signinUser } from "../../actions";
import Signin from "./Signin";

const mapDispatchToProps = (dispatch) => {
    const test = {onClick: (email, fName, lName) => {
        dispatch(signinUser(email, fName, lName));
    }};
    console.log(test);
    return {
        test
    }
};

const SigninContainer = connect(mapDispatchToProps)(Signin);

export default SigninContainer