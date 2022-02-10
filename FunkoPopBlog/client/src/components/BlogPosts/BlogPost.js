import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
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
                    <img src={blogPost.funkoPopImage} style={{ height: "300px", width: "250px" }}></img><br></br>
                </CardBody>
                <CardFooter>
                    Author: {blogPost.userProfile.displayName} <br></br>
                </CardFooter>
                <Button onClick={() => history.push(`/blogPost/details/${blogPost.id}`)}>Read This Blog Post</Button>
            </Card>
        </div >
    )
}