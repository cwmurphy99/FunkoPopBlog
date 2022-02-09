import React, { useState } from "react";
import { useHistory } from "react-router";
import { addComment } from "../../modules/commentManager";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import './Comment.css';

const AddComment = () => {
    const history = useHistory();
    const { id } = useParams();

    const [comment, setComment] = useState(
        {
            content: "",
            blogPostId: id
        });

    const handleControlledInputChange = (event) => {
        const newComment = { ...comment };
        let selectedVal = event.target.value;

        newComment[event.target.id] = selectedVal;

        setComment(newComment);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); //Prevents the browser from submitting the form
        addComment(comment).then(() => history.push(`/blogPost/details/${id}`));
    };

    return (
        <form className="main-content">
            <h2 className="_title">New Comment:</h2>
            <fieldset className="fieldset">
                <div className="form-group">
                    <textarea
                        type="text"
                        id="content"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        rows="6"
                        className="form-control"
                        value={`${comment.content}`}
                    />
                </div>
            </fieldset>
            <Button className="btn-add-save" onClick={handleSubmit}>
                Submit
            </Button>
            <Button
                className="btn-add-cancel"
                onClick={() => history.push(`/blogPost/details/${id}`)}
            >
                Cancel
            </Button>
        </form>
    );
};

export default AddComment;