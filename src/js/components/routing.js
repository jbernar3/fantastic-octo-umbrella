import {Route, Switch} from 'react-router-dom';
import SignUp from "./SignUp";
import React from "react";
import Signin from "./Signin";

const Body = () => (
    <div>
        <Switch>
            <Route exact path={"/signup"} component={SignUp} />
            <Route exact path={"/signin"} component={Signin} />
            <Route path={"*"} component={() => "404 NOT FOUND"}/>
        </Switch>
    </div>
);

export default Body