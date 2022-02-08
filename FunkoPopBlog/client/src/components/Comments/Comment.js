import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom/";
import { getCommentById } from "../../modules/commentManager";
import "./Comment.css";

export const Comment = ({ comment }) => {
    const { id } = useParams();
    const history = useHistory();



    return (
        <section style={{
            border: "1px solid black",
            margin: "10px"
        }}>
            {/* <p style={{ marginLeft: "10px" }}><strong>Subject: </strong>{comment.subject}</p> */}
            <p style={{ marginLeft: "10px" }}><strong>Content: </strong>{comment.content}</p>
            <p style={{ marginLeft: "10px" }}><strong>Author: </strong>{comment.userProfile.displayName}</p>
            <p style={{ marginLeft: "10px" }}><strong>Created on: </strong>{comment.createDateTime.split('T')[0]}</p>
            <button className="edit-comment-button" type="button" onClick={() => history.push(`/editComment/${comment.id}`)}>Edit Comment</button>
            <button className="delete-comment-button" type="button" onClick={() => history.push(`/deleteComment/${comment.id}`)}>Delete Comment</button>

        </section>
    );
}