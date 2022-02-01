/**
 * src example:https://dev.to/dansolhan/simple-dependency-injection-functionality-for-react-518j
 */

import React, {createContext, useContext} from "react";
import IAApi from "../apis/IAApi";

export const IAServiceContext = createContext(undefined);

export const useIAService = () => {
    const context = useContext(IAServiceContext);
    if (context === undefined) {
        throw new Error("IA Service was not provided");
    }
    return context;
};

const IAService = ({children}) => {
    const IAsService = {

        async getStrongestPath(orig, dest) {
            const requestOptions = {
                method: "GET",
                mode: "cors",
                headers: {
                    "accepts": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }


            }
            // const usernameOrig= orig.userProfile.profileUserName;
            // const usernameDest= dest.userProfile.profileUserName;
            const usernameOrig = 'ana';
            const usernameDest = 'sara';

            const res = await
                fetch(
                    `${IAApi.IABaseUrl}path?origem=${usernameOrig}&destino=${usernameDest}`,
                    requestOptions
                );

            // fetch(`${IAApi.IABaseUrl}hello`, requestOptions);
            console.log(res.clone().text())
            if (!res.ok || typeof res === "undefined") {
                throw Error("Opps Something went wrong with fetch");
            }

            return res.clone().text();
        },

    }
    return (
        <>
            <IAServiceContext.Provider value={IAsService}>
                {children}
            </IAServiceContext.Provider>
        </>
    );
};

export default IAService;
