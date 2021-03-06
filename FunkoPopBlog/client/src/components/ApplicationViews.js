import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { UserProfiles } from "./userProfile/UserProfile";
import FunkoPopList from "./FunkoPops/FunkoPopList";
import { FunkoPopDetails } from "./FunkoPops/FunkoPopDetails";
import BlogPostList from "./BlogPosts/BlogPostList";
import BlogPostForm from "./BlogPosts/BlogPostForm";
import { EditBlogPostForm } from "./BlogPosts/EditBlogPostForm";
import { BlogPostDetails } from "./BlogPosts/BlogPostDetails";
import DeleteBlogPostForm from "./BlogPosts/DeleteBlogPost";
import AddComment from "./Comments/AddComment";
import { CommentsList } from "./Comments/CommentsList";
import EditComment from "./Comments/EditComment";
import DeleteComment from "./Comments/DeleteComment";
import FunkoPopCollection from "./FunkoPops/FunkoPopCollection";
import "../App.css";


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
                <Route exact path="/BlogPost/details/:id">
                    {isLoggedIn ? <BlogPostDetails /> : <Redirect to="/login" />}
                    {isLoggedIn ? <CommentsList /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/BlogPost/Create">
                    {isLoggedIn ? <BlogPostForm /> : <Redirect to="/login" />}
                </Route>
                <Route path="/BlogPost/:blogPostId(\d+)/edit">
                    {isLoggedIn ? <EditBlogPostForm /> : <Redirect to="/login" />}
                </Route>
                <Route path="/BlogPost/Delete/:blogPostId(\d+)">
                    {isLoggedIn ? <DeleteBlogPostForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/Comments/add/:id">
                    {isLoggedIn ? <AddComment /> : <Redirect to="/login" />}
                </Route>
                <Route path="/Comments/:id">
                    {isLoggedIn ? <CommentsList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/deleteComment/:id">
                    {isLoggedIn ? <DeleteComment /> : <Redirect to="/login" />}

                </Route>
                <Route path="/editComment/:id">
                    {isLoggedIn ? <EditComment /> : <Redirect to="/login" />}
                </Route>

                <Route path="/MyCollection">
                    {isLoggedIn ? <FunkoPopCollection /> : <Redirect to="/login" />}
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
