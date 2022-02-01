import Reac, {useEffect, useState} from 'react'
import Comments from '../comments/Comments';
import {usePostService} from "../../services/PostService";
import CreateComment from "../comments/CreateComment"

const Post = ({post}) => {
    const postService = usePostService();
    const [isValid, setValid] = useState(false);
    const [comments, setComments] = useState([]);


    const createComment = async (postId, comment) => {

        const commentResult = await postService.createCommentFromPost(postId, comment).catch(setValid(true))

        console.log(commentResult)


    }


    useEffect(() => {

        const getComments = async () => {
            try {


                const postId = post.Id;
                const postResult = await postService.getPost(postId)

                setComments(postResult.comments)
                setValid(true)

                if (postResult.comments.lenght === 0) {
                    setValid(false);

                }
            } catch (e) {
                setValid(false)
            }


        }


        getComments()
        //console.log(comments)


    }, [isValid, setValid, comments, setComments])


    return (

        <div className="post">
            <div className="post-top">
                User
            </div>
            <h3 className="post-h3">
                {post.text}

            </h3>
            <CreateComment onCreate={createComment}></CreateComment>
            {isValid ? (<Comments comments={comments}></Comments>) : ('No comments yet')}


        </div>


    )
}

export default Post
