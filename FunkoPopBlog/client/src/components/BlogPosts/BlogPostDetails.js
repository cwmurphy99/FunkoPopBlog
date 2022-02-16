import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getBlogPostById } from "../../modules/blogPostManager";
import { Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap";
import "../BlogPosts/BlogPost.css";

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
        <div className="funkoBlogDetailsList">
            <h2>Blog Details</h2>
            < Card >
                <div className="funkoBlogDetailsContainer">
                    <CardHeader>
                        <div className="funkoCardTitleBlogDetails">
                            <strong>Title: </strong>
                            <p className="paragraphText">{blogPost.title}</p>
                        </div>
                        <div className="funkoCardNameBlogDetails">
                            <strong> FunkoPop! </strong>
                            <p className="paragraphText">{blogPost.funkoPopTitle}</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="funkoBlogContentDetails">
                            <p className="paragraphText">{blogPost.content}</p>
                        </div>
                        <div className="funkoImageSrcBlogDetails">
                            <img src={blogPost.funkoPopImage} ></img>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="funkoCardAuthorBlogDetails">
                            <strong>Author: </strong>
                            <p className="paragraphText">{blogPost.userProfile.displayName}</p>
                        </div>
                        <div className="funkoCardPublishBlogDetails">
                            <strong>Published Date: </strong>
                            <p className="paragraphText">{blogPost.createDateTime.slice(0, 10)}</p>
                        </div>
                        <div className="funkoCardEditDeleteButtonContainerBlogDetails">
                            <Button className="button" type="button" onClick={() => history.push(`/BlogPost/${blogPost.id}/edit`)}>Edit</Button>
                            <Button className="button" type="button" onClick={() => { history.push(`/BlogPost/delete/${blogPost.id}`) }}>Delete</Button>
                        </div>
                        <div className="funkoCardViewReturnButtonContainerBlogDetails">
                            <Button className="button" onClick={() => history.push(`/comments/${blogPost.id}`)}>View Comments</Button>
                            <Button className="button" onClick={() => history.push(`/BlogPost`)}>Return to Forum</Button>
                        </div>
                    </CardFooter>
                </div>
            </Card>
        </div >
    )
}