import React, { useEffect, useState } from "react";
import BlogPost from "./BlogPost";
import { getBlogPosts } from "../../modules/blogPostManager";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "reactstrap";
import "./BlogPost.css";


export default function BlogPostList() {
    const [blogPosts, setBlogPosts] = useState([])

    const history = useHistory();

    useEffect(() => {
        getBlogPosts().then(setBlogPosts)
    }, [])

    return (
        <section className="funkoPopList">
            <h1>Funko Forum</h1>
            <div className="funkoPopButtonContainerBlog">
                <Button type="button" className="button" onClick={() => { history.push("/BlogPost/create") }}> Add Blog Post </Button>
            </div>

            <div className="funkoPopContainer">
                {blogPosts.map(p => <BlogPost key={p.id} blogPost={p} />)}
            </div>
        </section>
    )
}