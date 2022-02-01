import React from 'react'
import Comment from './Comment'

const Comments = ({comments}) => {
    return (
        <>
            <div className="comments">
                {comments.map((comment, index) => (
                    <Comment key={index} comment={comment}/>
                ))}
            </div>

        </>
    )
}

export default Comments