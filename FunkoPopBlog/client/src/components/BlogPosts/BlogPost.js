import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import "./BlogPost.css"


export default function BlogPost({ blogPost }) {
    const history = useHistory();

    return (
        <div className="blogPostCard">
            <Card>
                <CardHeader>
                    <strong>Title: {blogPost.title}</strong>
                </CardHeader>
                <CardBody>
                    Author: {blogPost.userProfile.displayName} <br></br>
                </CardBody>
                <Button onClick={() => history.push(`/blogPost/details/${blogPost.id}`)}>Read This Blog Post</Button>
            </Card>
        </div >
    )
}