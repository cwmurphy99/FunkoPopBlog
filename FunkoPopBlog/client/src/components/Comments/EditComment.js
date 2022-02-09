import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getCommentById, updateComment } from "../../modules/commentManager";
import { Button } from "reactstrap";

export const EditComment = () => {
    const history = useHistory();
    const { id } = useParams();


    const [comment, setComment] = useState({
        content: "",
        id: id
    });

    console.log(id + " id")
    console.log(comment)
    console.log(comment.content)
    console.log(comment.id)


    const handleControlledInputChange = (event) => {
        const newComment = { ...comment };
        let selectedVal = event.target.value;

        newComment[event.target.id] = selectedVal;
        setComment(newComment);
    };

    const handleClickSaveComment = (e) => {
        e.preventDefault();
        updateComment(comment).then(() => history.goBack());
    }
    const handleGoBack = (e) => {
        e.preventDefault();
        history.goBack()
    }


    return (
        <form className="main-content">
            <h2 className="_title">Edit Comment:</h2>
            <fieldset className="fieldset">
                <div className="form-group">
                    <label htmlFor="subject">Comment :</label>
                    <textarea
                        type="text"
                        id="content"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        rows="6"
                        className="form-control"
                        value={comment.content}
                    />
                </div>
            </fieldset>
            <Button className="btn-add-save" onClick={handleClickSaveComment}>
                Submit
            </Button>
            <Button
                className="btn-add-edit"
                onClick={handleGoBack}
            >
                Cancel
            </Button>
        </form>
    );
}

export default EditComment;