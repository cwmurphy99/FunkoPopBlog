import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { UserProfiles } from "./userProfile/UserProfiles";
import FunkoPopList from "./FunkoPops/FunkoPopList";
import { FunkoPopDetails } from "./FunkoPops/FunkoPopDetails";

export default function ApplicationViews({ isLoggedIn }) {

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/Products" >
                    {isLoggedIn ? <FunkoPopList /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/Products/Details/:id">
                    {isLoggedIn ? <FunkoPopDetails /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/login">
                    {isLoggedIn ? <Redirect to="/" /> : <Login />}
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
};
