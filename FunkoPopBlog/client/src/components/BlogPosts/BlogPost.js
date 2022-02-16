import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import "./BlogPost.css"
//import "../FunkoPops/FunkoPop.css";

export default function BlogPost({ blogPost }) {
    const history = useHistory();

    return (
        <div className="funkoCardBlog">
            <Card>
                <CardHeader>
                    <div className="funkoCardTitleBlog">
                        <strong>Title: </strong>
                    </div>
                    <div className="funkoCardTitleNameBlog">
                        {blogPost.title}
                    </div>
                </CardHeader>
                <div className="funkoImageBlog">
                    <CardBody>
                        <img className="funkoImageSrcBlog" src={blogPost.funkoPopImage}></img><br></br>
                    </CardBody>
                </div>
                <CardFooter>
                    <div className="funkoCardAuthorBlog">
                        <strong>Author: </strong>
                    </div>
                    <div className="funkoCardAuthorNameBlog">
                        {blogPost.userProfile.displayName}
                    </div>
                    <div className="funkoPopCardButtonBlog">
                        <Button onClick={() => history.push(`/blogPost/details/${blogPost.id}`)}>Read This Blog!</Button>
                    </div>
                </CardFooter>
            </Card>
        </div >
    )
}