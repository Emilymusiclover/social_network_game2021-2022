/**
 * src example:https://dev.to/dansolhan/simple-dependency-injection-functionality-for-react-518j
 */

import React, {useContext, createContext} from "react";
import AppSiteApi from "../apis/AppSiteApi";
import {authHeader} from "../components/general/RequestHeader";
import {
    requestOptionsGet,
    requestOptionsPostBody,
} from "../apis/RequestOptions";

export const UserServiceContext = createContext(undefined);

export const useUserService = () => {
    const context = useContext(UserServiceContext);
    if (context === undefined) {
        throw new Error("User Service was not provided");
    }
    return context;
};

const UserService = ({children}) => {
    const usersService = {
        async createUser(user) {
            try {
                const requestOptions = requestOptionsPostBody(user);

                const res = await fetch(
                    `${AppSiteApi.appSiteBaseUrl}Users`,
                    requestOptions
                );

                if (res.status === 400) {
                    // console.log(res.clone().json());
                    //console.log(res.clone().json().errors);
                    alert("Oppps 400 ERROR");
                }
            } catch (error) {
                //setError(error.message);
            }
        },

        async fetchUsers() {
            const requestOptions = requestOptionsGet;

            const res = await fetch(
                `${AppSiteApi.appSiteBaseUrl}Users`,
                requestOptions
            );
            if (!res.ok || typeof res === "undefined") {
                throw Error("Opps Something went wrong with fetch");
            }

            const data = await res.clone().json();

            return data;
        },

        async fetchUsersByIds(ids) {
            console.log(ids)
            const requestOptions = requestOptionsGet;
            let query = "";
            for (let i = 1; i < ids.length; i++) {
                query += "&ids=" + ids[i];
            }

            console.log(query)

            const res = await fetch(
                `${AppSiteApi.appSiteBaseUrl}Users/userIds/?ids=${ids[0]}${query}`,
                requestOptions
            );
            if (!res.ok || typeof res === "undefined") {
                throw Error("Opps Something went wrong with fetch");
            }

            const data = await res.clone().json();
            console.log(data)
            return data;
        },

        async getUserById(id) {
            const requestOptions = requestOptionsGet;

            const res = await fetch(
                `${AppSiteApi.appSiteBaseUrl}Users/${id}`,
                requestOptions
            );
            if (!res.ok || typeof res === "undefined") {
                throw Error("Opps Something went wrong with fetch");
            }

            const data = await res.clone().json();
            console.log(data)
            return data;
        },

        async updateUser(updatedUser) {
            try {

                var myHeaders = new Headers();
                let user = JSON.parse(localStorage.getItem("currentUser"));

                const userEmail = user.userEmail;
                const password = user.userPassword;
                myHeaders.append(
                    "Authorization",
                    "Basic " + btoa(`${userEmail}:${password}`)
                );
                myHeaders.append("Accept", "application/json");
                myHeaders.append("Content-Type", "application/json");

                const requestOptions = {
                    method: "PUT",
                    mode: "cors",
                    headers: myHeaders,

                    credentials: "same-origin",

                    body: JSON.stringify(updatedUser.userProfile),
                };
                const params = updatedUser.userProfile.id;
                const res = await fetch(
                    `${AppSiteApi.appSiteBaseUrl}Users/UserProfile/${params}`,
                    requestOptions
                );

                if (res.status === 400 || !res.ok) {
                    //console.log(res.clone().json());
                    //console.log(res.clone().json().errors);
                    //alert("Ops ERROR");
                }
                const data = res.json();
                //console.log(data);
                return data;
            } catch (error) {
                //console.log(error);
            }
        },
        //Basic Auth
        async authenticateUser(userEmail, password) {
            const requestOptions = {
                method: "POST",
                mode: "cors",

                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({userEmail, password}),
            };

            const res = await fetch(
                `${AppSiteApi.appSiteBaseUrl}Users/authenticate`,
                requestOptions
            );
            //console.log(res.status)

            if (res.status !== 200 || !res.ok) {
                throw Error("Opps Something went wrong with fetch");
            }

            const data = await res.clone().json();

            return data;
        },

        async fetchUserTagCloud(id) {

            const requestOptions = requestOptionsGet;

            const res = await fetch(
                `${AppSiteApi.appSiteBaseUrl}Users/UserTagCloud/id=${id}`,
                requestOptions
            );
            if (!res.ok || typeof res === "undefined") {
                throw Error("Opps Something went wrong with fetch");
            }

            const data = await res.clone().json();

            return data;
        }
    };

    return (
        <>
            <UserServiceContext.Provider value={usersService}>
                {children}
            </UserServiceContext.Provider>
        </>
    );
};

export default UserService;
