import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getBlogPostById } from "../../modules/blogPostManager";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";

export const BlogPostDetails = () => {
    const [blogPost, setBlogPost] = useState();
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getBlogPostById(id).then(setBlogPost);
    }, [id])

    if (!blogPost) {
        return null
    }



    return (
        <div className="blogPostDetailsCard">
            <h2>Blog Details</h2>
            < Card >
                <CardHeader>
                    <strong>Title: {blogPost.title}</strong><br></br><br></br>
                </CardHeader>
                <CardBody>
                    {blogPost.content}
                </CardBody>
                <CardFooter>
                    Published Date: {blogPost.createDateTime.slice(0, 10)}
                    <br>
                    </br>
                    Author: {blogPost.userProfile.displayName}<br></br><br></br>
                    <button className="editBlogButton" type="button" onClick={() => history.push(`/BlogPost/${blogPost.id}/edit`)}>Edit</button>
                    <button className="deleteBlogButton" type="button" onClick={() => { history.push(`/BlogPost/delete/${blogPost.id}`) }}>Delete</button>
                </CardFooter>
                <button onClick={() => history.push(`/Comments/${blogPost.id}`)}>View Comments</button>
            </Card>
        </div >
    )
}