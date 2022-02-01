import React, {createContext, useContext} from "react";
import AppSiteApi from "../apis/AppSiteApi";
import {requestOptionsGet} from "../apis/RequestOptions";

export const ConnectionServiceContext = createContext(undefined);

export const useConnectionService = () => {
    const context = useContext(ConnectionServiceContext);
    if (context === undefined) {
        throw new Error("Connection Service was not provided");
    }
    return context;
};

const ConnectionService = ({children}) => {
    const connectionsService = {
        async fetchCommonFriends(user1, user2) {
            const requestOptions = requestOptionsGet;

            let idUser1 = user1.id;
            let idUser2 = user2;
            if (typeof idUser2 === 'undefined' || idUser2 === null || idUser2 === "") {
                throw Error("You haven't selected an user yet.")
            }
            const res = await fetch(
                `${AppSiteApi.appSiteBaseUrl}Connections/idUser1=${idUser1}&idUser2=${idUser2}`,
                requestOptions
            );
            if (!res.ok || typeof res === "undefined") {
                throw Error("Ops Something went wrong with fetch");
            }
            return await res.clone().json();
        },

        async fetchFriendsToBe(user1) {
            const requestOptions = requestOptionsGet;

            let idUser1 = user1.id;
            const res = await fetch(
                `${AppSiteApi.appSiteBaseUrl}Connections/idUser1=${idUser1}`,
                requestOptions
            );
            if (!res.ok || typeof res === "undefined") {
                throw Error("Ops Something went wrong with fetch");
            }
            return await res.clone().json();
        }
    };

    return (
        <>
            <ConnectionServiceContext.Provider value={connectionsService}>
                {children}
            </ConnectionServiceContext.Provider>
        </>
    );
};

export default ConnectionService;