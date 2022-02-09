import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getBlogPostById } from "../../modules/blogPostManager";
import { Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap";


export const BlogPostDetails = () => {
    const [blogPost, setBlogPost] = useState();

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getBlogPostById(id).then
            (setBlogPost);
    }, [id])

    if (!blogPost) {
        return null
    }


    return (
        <div className="blogPostDetailsCard">
            <h2>Blog Details</h2>
            < Card >
                <CardHeader>
                    <strong>Title: </strong>{blogPost.title}<br></br>
                    <strong>FunkoPop! </strong> {blogPost.funkoPopTitle}<br></br>
                </CardHeader>
                <CardBody>
                    {blogPost.content}<br></br><br></br>
                    <img src={blogPost.funkoPopImage} style={{ height: "300px", width: "250px" }}></img><br></br>
                </CardBody>
                <CardFooter>
                    Published Date: {blogPost.createDateTime.slice(0, 10)}
                    <br>
                    </br>
                    Author: {blogPost.userProfile.displayName}<br></br><br></br>
                    <Button className="button" type="button" onClick={() => history.push(`/BlogPost/${blogPost.id}/edit`)}>Edit</Button>
                    <Button className="button" type="button" onClick={() => { history.push(`/BlogPost/delete/${blogPost.id}`) }}>Delete</Button><br></br><br></br>
                    <Button className="button" onClick={() => history.push(`/comments/${blogPost.id}`)}>View Comments</Button>
                    <Button className="button" onClick={() => history.push(`/BlogPost`)}>Return to Forum</Button>
                </CardFooter>
            </Card>
        </div >
    )
}