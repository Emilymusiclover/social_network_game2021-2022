/**
 * src example:https://dev.to/dansolhan/simple-dependency-injection-functionality-for-react-518j
 */

import React, {useContext, createContext} from "react";
import MasterPosts from "../apis/MasterPostsApi";
import RequestOptions from "../apis/RequestOptions";

export const PostServiceContext = createContext(undefined);

export const usePostService = () => {
    const context = useContext(PostServiceContext);
    if (context === undefined) {
        throw new Error("Posts Service was not provided");
    }
    return context;
};

const PostService = ({children}) => {
    const postsService = {
        async createPost(post, id) {
            try {
                const requestOptions = RequestOptions.generateBasicPost(post);

                const res = await fetch(
                    `${MasterPosts.BaseUrl}posts/${id}`,
                    requestOptions
                );

                if (res.status === 400) {
                    // console.log(res.clone().json());
                    //console.log(res.clone().json().errors);
                    alert("Oppps 400 ERROR");
                }
                return res.clone().json();
            } catch (error) {
                //setError(error.message);
            }
        },
        async createPostComment(comment, id) {
            try {
                const requestOptions = RequestOptions.generateBasicPost(comment);

                const res = await fetch(
                    `${MasterPosts.BaseUrl}posts/comments/${id}`,
                    requestOptions
                );

                if (res.status === 400) {
                    // console.log(res.clone().json());
                    //console.log(res.clone().json().errors);
                    throw new Error("Fail")
                }
                return res.clone().json();
            } catch (error) {
                //setError(error.message);
            }
        },
        async getPost(id) {
            try {
                const requestOptions = {
                    method: "GET",
                    mode: "cors",

                };

                const res = await fetch(
                    `${MasterPosts.BaseUrl}posts/${id}`,
                    requestOptions
                );

                if (res.status === 400) {
                    // console.log(res.clone().json());
                    //console.log(res.clone().json().errors);
                    throw new Error("Fail")
                }
                return res.clone().json();
            } catch (error) {
                //setError(error.message);
            }
        },
        async getAllPosts() {
            try {
                const requestOptions = {
                    method: "GET",
                    mode: "cors",

                };

                const res = await fetch(
                    `${MasterPosts.BaseUrl}posts`,
                    requestOptions
                );

                if (res.status === 400) {
                    // console.log(res.clone().json());
                    //console.log(res.clone().json().errors);
                    alert("Oppps 400 ERROR");
                }
                return res.clone().json();
            } catch (error) {
                //setError(error.message);
            }
        },
        async getCommentsFromPost(id) {
            try {
                const requestOptions = {
                    method: "GET",
                    mode: "cors",

                };

                const res = await fetch(
                    `${MasterPosts.BaseUrl}posts/comments/${id}`,
                    requestOptions
                );

                if (res.status === 400) {
                    // console.log(res.clone().json());
                    //console.log(res.clone().json().errors);
                    throw new Error("Fail")
                }
                return res.clone().json();
            } catch (error) {
                //setError(error.message);
            }
        },


    };

    return (
        <>
            <PostServiceContext.Provider value={postsService}>
                {children}
            </PostServiceContext.Provider>
        </>
    );
};

export default PostService;
