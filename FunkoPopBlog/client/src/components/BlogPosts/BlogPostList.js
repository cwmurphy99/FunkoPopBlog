import React, { useEffect, useState } from "react";
import BlogPost from "./BlogPost";
import { getBlogPosts } from "../../modules/blogPostManager";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "reactstrap";

export default function BlogPostList() {
    const [blogPosts, setBlogPosts] = useState([])

    const history = useHistory();

    useEffect(() => {
        getBlogPosts().then(setBlogPosts)
    }, [])

    return (
        <section className="blogPostList">
            <h1>Funko Forum</h1>
            <Button type="button" className="button" onClick={() => { history.push("/BlogPost/create") }}> Add Blog Post </Button>
            {blogPosts.map(p => <BlogPost key={p.id} blogPost={p} />)}
        </section>
    )
}