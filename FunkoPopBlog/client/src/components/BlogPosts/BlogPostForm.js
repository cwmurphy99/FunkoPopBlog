import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { addBlogPost } from "../../modules/blogPostManager";
import { Button, Form, Label, Input, FormGroup } from "reactstrap";
import { useEffect } from "react/cjs/react.development";
import { getMyCollection } from "../../modules/FunkoPopManager";



const BlogPostForm = () => {

    const [favPops, setFavPops] = useState([]);

    useEffect(() => {
        getMyCollection().then(setFavPops);
    }, [])

    const [blogPost, setBlogPost] = useState({
        title: "",
        content: "",
        publishDateTime: "",
        funkoPopId: 0,
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
        const addBlogPostCopy = { ...blogPost }
        if (addBlogPostCopy.funkoPopId === 0) {
            addBlogPostCopy.funkoPopId = null
        }
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
        <div className="formBlogPost">
            <Form className="formContainer">
                <h2 className="postForm__title">New Blog Post</h2>
                <div className="formBlogPostContainer">
                    <FormGroup>
                        <Label htmlFor="favPop"><strong>FunkoPop: </strong></Label><br></br>
                        <select id="funkoPopId" onChange={handleControlledInputChange}>
                            <option key={0} value="0">Select Your Favorite</option>
                            {favPops.map(favPop => <option key={favPop.id} value={favPop.id}>{favPop.title}</option>)}
                        </select>
                    </FormGroup>


                    <FormGroup>
                        <Label htmlFor="name"><strong>Title: </strong></Label>
                        <Input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Post Title" value={blogPost.title} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="name"><strong>Content: </strong></Label>
                        <Input type="textarea" id="content" onChange={handleControlledInputChange} required className="form-control" placeholder="Content" value={blogPost.content} />
                    </FormGroup>


                    <FormGroup>
                        <Label htmlFor="publishDateTime"><strong>Blog Post Date: </strong></Label>
                        <Input type="date" id="today" name="dateRequired" onChange={handleControlledInputChange} required readOnly value={today} />
                    </FormGroup>
                </div>
                <div className="funkoPopButtonContainerBlogForm">
                    <Button className="btn btn-primary" onClick={handleClickSavePost}>Save post</Button>
                </div>

            </Form>
        </div>
    )
};

export default BlogPostForm;