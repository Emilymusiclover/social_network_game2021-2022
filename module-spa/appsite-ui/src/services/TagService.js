import React, {useContext, createContext} from "react";
import AppSiteApi from "../apis/AppSiteApi";
import {
    requestOptionsGet,
} from "../apis/RequestOptions";

export const TagServiceContext = createContext(undefined);

export const useTagService = () => {
    const context = useContext(TagServiceContext);
    if (context === undefined) {
        throw new Error("Tag Service was not provided");
    }
    return context;
};

const TagService = ({children}) => {
    const tagsService = {

        async fetchTagCloud() {
            const requestOptions = requestOptionsGet;

            const res = await fetch(
                `${AppSiteApi.appSiteBaseUrl}TagCloud`,
                requestOptions
            );
            if (!res.ok || typeof res === "undefined") {
                throw Error("Opps Something went wrong with fetch");
            }
            console.log(res.clone().json());
            const data = await res.clone().json();

            return data;
        }
    };

    return (
        <>
            <TagServiceContext.Provider value={tagsService}>
                {children}
            </TagServiceContext.Provider>
        </>
    );
};

export default TagService;
