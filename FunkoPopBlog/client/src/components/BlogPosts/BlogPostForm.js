import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { addPost } from "../../modules/postManager";
import { Button, Form, Label, Input, FormGroup } from "reactstrap";


const PostForm = () => {
    //const [state, setState] = useState({});

    const [blogPost, setBlogPost] = useState({
        title: "",
        content: "",
        publishDateTime: ""
    });


    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newBlogPost = { ...blogPost }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newBlogPost[event.target.id] = selectedVal
        setBlogPost(newBlogPost)
    }

    const handleClickSavePost = (event) => {
        event.preventDefault()
        addPost(blogPost)
            .then(() => history.push("/blogPost"))
    }



    return (
        <Form className="form-group">

            <h2 className="postForm__title">New Blog Post</h2>
            <FormGroup className="form-group">
                <Label htmlFor="name">Title:</Label>
                <Input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Post Title" value={blogPost.title} />
            </FormGroup>
            <FormGroup className="form-group">
                <Label htmlFor="name">Content:</Label>
                <Input type="textarea" id="content" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Content" value={blogPost.content} />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="publishDateTime">Published Date</Label>
                <Input type="datetime-local" id="publishDateTime" onChange={handleControlledInputChange} value={blogPost.publishDateTime} />
            </FormGroup>
            <Button className="btn btn-primary" onClick={handleClickSavePost}>Save post</Button>



        </Form>
    )
};

export default PostForm;