/**
 * src example:https://dev.to/dansolhan/simple-dependency-injection-functionality-for-react-518j
 */

import React, {useContext, createContext} from "react";
import MasterPosts from "../apis/MasterPostsApi";
import RequestOptions from "../apis/RequestOptions";

export const FeedServiceContext = createContext(undefined);

export const useFeedService = () => {
    const context = useContext(FeedServiceContext);
    if (context === undefined) {
        throw new Error("Posts Service was not provided");
    }
    return context;
};

const FeedService = ({children}) => {
    const feedsService = {

        async getFeedByUser(id) {
            try {
                const requestOptions = {
                    method: "GET",
                    mode: "cors",

                };

                const res = await fetch(
                    `${MasterPosts.BaseUrl}feeds/userId/${id}`,
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
            <FeedServiceContext.Provider value={feedsService}>
                {children}
            </FeedServiceContext.Provider>
        </>
    );
};

export default FeedService;
