import React from 'react'
import Post from './Post'

const Posts = ({posts, comments}) => {
    return (
        <>
            {posts.map((post, index) => (
                <Post key={index} post={post}/>
            ))}

        </>
    )
}

export default Posts
