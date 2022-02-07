import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../modules/commentManager";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Comment } from "./Comment";
import { getBlogPostById } from "../../modules/blogPostManager";

export const CommentsList = () => {
    const [comments, setComments] = useState([]);
    const [blogPost, setBlogPost] = useState();
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getComments(id).then(cmts => { setComments(cmts) });
        getBlogPostById(id).then(pst => { setBlogPost(pst) });
    }, [id])

    return (
        <div>
            {blogPost !== undefined ? <h3>Comments for '{blogPost.title}'</h3> : null}
            {comments.length > 0 ? comments.map(c => <Comment key={c.id} comment={c} />) : <h3>There aren't any comments for this Blog Post.</h3>}
            <button className="leave-comment-button" onClick={() => history.push(`/comments/add/${id}`)}>Leave a Comment</button>
            <button className="return-to-blog-button" onClick={() => history.push(`/blogPost/details/${id}`)}>Return to Blog Post</button>
        </div>
    );
}