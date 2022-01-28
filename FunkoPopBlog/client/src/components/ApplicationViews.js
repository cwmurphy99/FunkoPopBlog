import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { UserProfiles } from "./userProfile/UserProfiles";


export default function ApplicationViews({ isLoggedIn }) {

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
                </Route>
                <Route path="/Tag" exact>
                    <TagList />
                </Route>
                <Route path="/Tag/create">
                    <AddTagForm />
                </Route>
                <Route path="/Tag/:tagId(\d+)/edit">
                    <EditTagForm />
                </Route>
                <Route path="/Tag/delete/:tagId(\d+)">
                    <DeleteTagForm />
                </Route>
                <Route exact path="/myposts" >
                    {isLoggedIn ? <PostList allPosts={false} /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/post" >
                    {isLoggedIn ? <PostList allPosts={true} /> : <Redirect to="/login" />}
                </Route>
                <Route path="/post/details/:id">
                    <PostDetails />
                </Route>
                <Route path="/comments/:id">
                    <CommentsList />
                </Route>
                <Route path="/post/create">
                    <PostForm />
                </Route>
                <Route path="/post/:postId(\d+)/edit">
                    <EditPostForm />
                </Route>
                <Route path="/post/delete/:postId(\d+)">
                    <DeletePostForm />
                </Route>
                <Route path="/category" exact>
                    <CategoryList />
                </Route>
                <Route path="/category/create/">
                    <AddCategory />
                </Route>
                <Route path="/category/:categoryId(\d+)/edit">
                    <EditCategory />
                </Route>
                <Route path="/category/delete/:categoryId(\d+)">
                    <DeleteCategory />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/userprofiles">
                    <UserProfiles />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
};
