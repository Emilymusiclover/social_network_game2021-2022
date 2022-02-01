import React from 'react'
import {useEffect, useState} from "react";

const CreatePost = ({onCreate}) => {

    const [text, setPost] = useState("");

    const enabled =
        text.length > 0;


    const onSubmit = (e) => {
        e.preventDefault();
        if (!text) {
            alert("Post body is empty");
            return;
        }

        const post = {text}
        onCreate(post)
        setPost("");


    }


    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>New Post</label>
                <textarea

                    placeholder="Hey! Share your thoughts here ..."
                    value={text}
                    onChange={(e) => setPost(e.target.value)}

                ></textarea>
            </div>

            <input type="submit" value="Create New Post" disabled={!enabled} className="btn btn-block"/>

        </form>
    );
}

export default CreatePost
