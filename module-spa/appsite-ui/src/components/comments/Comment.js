import React from 'react'

const Comment = ({comment}) => {
    return (
        <div className="comment">
            <h5>
                {comment.text}

            </h5>
        </div>


    )
}

export default Comment
