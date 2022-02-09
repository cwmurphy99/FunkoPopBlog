import React, { useState, useEffect } from "react";
import { getBlogPostById, updateBlogPost } from "../../modules/blogPostManager";
import { useHistory, useParams } from "react-router";
import { Button } from "reactstrap";


export const EditBlogPostForm = () => {
    const [blogPost, setBlogPost] = useState({
        title: "",
        content: "",
        publishDateTime: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const { blogPostId } = useParams();
    const history = useHistory();
    const [categories, setCategories] = useState([]);


    const handleFieldChange = event => {
        const stateToChange = { ...blogPost };
        stateToChange[event.target.id] = event.target.value;
        setBlogPost(stateToChange);
    };


    const updateExistingPost = event => {
        event.preventDefault()
        setIsLoading(true);

        const editedBlogPost = {
            id: blogPostId,
            title: blogPost.title,
            content: blogPost.content
        };

        updateBlogPost(editedBlogPost)
            .then(() => history.push("/BlogPost")
            )
    }
    useEffect(() => {
        getBlogPostById(blogPostId)
            .then(blogPost => {
                setBlogPost(blogPost);
                setIsLoading(false);
            });
    }, [blogPostId]);

    return (
        <>
            <form>
                <fieldset>
                    <h2 className="blogPostForm__title">Edit Blog Post</h2>
                    <div className="formgroup">
                        <label htmlFor="name">Blog Post</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="title"
                            value={blogPost.title}
                        />
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="content"
                            value={blogPost.content}
                        />
                        <Button
                            type="button" disabled={isLoading}
                            onClick={updateExistingPost}
                            className="button"
                        >Submit</Button>
                    </div>
                </fieldset>
            </form>
        </>
    );
}

