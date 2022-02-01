import React from 'react'
import {useEffect, useState} from "react";
import {useLocalStorage} from 'usehooks-ts'
import Button from '../general/Button';
import Header from '../general/Header';
import CreatePost from './CreatePost';
import Posts from './Posts'
import {usePostService} from "../../services/PostService";
import {useFeedService} from "../../services/FeedService";

import Utils from "../../services/Utils";

const UserFeed = () => {
    const postService = usePostService();
    const feedService = useFeedService();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);


    const createPost = async (post) => {
        const user = await Utils.getUserDataStorage();

        const id = user.id;
        const postResult = await postService.createPost(post, id).catch(setLoading(true))

        console.log(postResult)


    }


    useEffect(() => {
        const getFeed = async () => {

            const user = await Utils.getUserDataStorage();

            const id = user.id;
            try {
                const postsResult = await feedService.getFeedByUser(id)

                setPosts(postsResult.posts)
                setLoading(false);

            } catch (e) {
                setLoading(true)
                console.log('ops...')
            }

            // console.log(postsResult.posts)


        }

        getFeed();


    }, [loading, setLoading, posts, setPosts])


    useEffect(() => {
        if (posts.length === 0) {
            setLoading(true)
        }


    }, [setPosts])


    return (
        <div className="container">
            <Header title={'Create New Post'}></Header>
            <CreatePost onCreate={createPost}/>

            <Button color={"red"} text={"Cancel"} onClick={(e) => console.log("hello")}></Button>
            <div className="posts-container">
                {!loading ? (<Posts posts={posts}></Posts>
                ) : ('Waiting for posts')}
            </div>

        </div>
    )
}

export default UserFeed
