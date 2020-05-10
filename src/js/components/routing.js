import {Route, Switch} from 'react-router-dom';
import SignUp from "./SignUp";
import React from "react";
import Signin from "./Signin";
import {ProtectedRoute} from "../protected.route";
import Home from "./Home";

const Body = () => (
    <div>
        <Switch>
            <ProtectedRoute exact path={"/"} component={Home} />
            <Route exact path={"/signup"} component={SignUp} />
            <Route exact path={"/home"} component={Home} />
            <Route exact path={"/signin"} component={Signin} />
            <Route path={"*"} component={() => "404 NOT FOUND"}/>
        </Switch>
    </div>
);

export default Body