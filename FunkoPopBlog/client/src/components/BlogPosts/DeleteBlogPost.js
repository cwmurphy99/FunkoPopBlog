import React from "react";
import { Card, CardBody } from "reactstrap";
import { useHistory, useParams } from "react-router";
import { deleteBlogPost } from "../../modules/blogPostManager";

const DeleteBlogPostForm = ({ }) => {
    const history = useHistory();
    const { blogPostId } = useParams();
    const handleDeleteBlogPost = () => {
        deleteBlogPost(blogPostId)
            .then(() => history.push("/BlogPost"));
    };

    return (
        <Card >
            <CardBody>
                <p>
                    <strong>Do you really want to DELETE this Blog Post?</strong>

                    <br></br>
                    <br></br>
                    <i>There's no turning back</i>
                    <br></br>
                    <br></br>
                    <i>This process CANNOT be reversed</i>
                    <br></br><br></br>
                    <button className="button" type="button" onClick={() => { history.push("/BlogPost") }}> No </button>
                    <button className="button" type="button" onClick={handleDeleteBlogPost}> Yes </button>
                </p>
            </CardBody>
        </Card>
    );
};

export default DeleteBlogPostForm;