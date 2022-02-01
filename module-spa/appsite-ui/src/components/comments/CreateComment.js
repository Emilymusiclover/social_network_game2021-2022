import React from 'react'
import {useEffect, useState} from "react";

const CreateComment = ({onCreate}) => {
    const [text, setComment] = useState("");

    const enabled =
        text.length > 0;


    const onSubmit = (e) => {
        e.preventDefault();
        if (!text) {
            alert("Comment body is empty");
            return;
        }

        const comment = {text}
        onCreate(comment)
        setComment("");


    }


    return (
        <form className="form-comment" onSubmit={onSubmit}>
            <div className="create-comment">
                <label>Create New Comment</label>
                <textarea

                    placeholder="Hey! Comment here ..."
                    value={text}
                    onChange={(e) => setComment(e.target.value)}

                ></textarea>
            </div>

            <input type="submit" value="Create New Comment" disabled={!enabled} className="btn "/>

        </form>
    );
}

export default CreateComment
