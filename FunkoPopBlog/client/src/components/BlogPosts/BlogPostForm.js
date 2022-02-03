import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { addBlogPost } from "../../modules/blogPostManager";
import { Button, Form, Label, Input, FormGroup } from "reactstrap";
import { isCursorAtEnd } from "@testing-library/user-event/dist/utils";


const BlogPostForm = () => {
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
        addBlogPost(blogPost)
            .then(() => history.push("/blogPost"))
    }


    var myDate, day, month, year, today;
    myDate = new Date();
    day = myDate.getDate();
    if (day < 10)
        day = "0" + day;
    month = myDate.getMonth() + 1;
    if (month < 10)
        month = "0" + month;
    year = myDate.getFullYear();
    today = year + "-" + month + "-" + day;




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
                <Label htmlFor="publishDateTime">Blog Post Date</Label>
                <Input type="date" id="today" name="dateRequired" onChange={handleControlledInputChange} required readOnly value={today} />
            </FormGroup>
            <Button className="btn btn-primary" onClick={handleClickSavePost}>Save post</Button>



        </Form>
    )
};

export default BlogPostForm;