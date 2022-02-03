import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { UserProfiles } from "./userProfile/UserProfiles";
import FunkoPopList from "./FunkoPops/FunkoPopList";
import { FunkoPopDetails } from "./FunkoPops/FunkoPopDetails";
import BlogPostList from "./BlogPosts/BlogPostList";
import BlogPostForm from "./BlogPosts/BlogPostForm";

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
                <Route exact path="/BlogPost" >
                    {isLoggedIn ? <BlogPostList /> : <Redirect to="/login" />}
                </Route>
                {/* <Route path="/BlogPost/details/:id">
                    <BlogPostDetails />
                </Route> */}
                <Route exact path="/BlogPost/Create">
                    <BlogPostForm />
                </Route>

                <Route exact path="/Login">
                    {isLoggedIn ? <Redirect to="/" /> : <Login />}
                </Route>
                <Route path="/Register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
};
