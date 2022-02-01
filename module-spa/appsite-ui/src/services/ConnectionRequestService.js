import React, {useContext, createContext} from "react";
import AppSiteApi from "../apis/AppSiteApi";
import {authHeader} from "../components/general/RequestHeader";
import {
    requestOptionsGet,
    requestOptionsPostBody,
} from "../apis/RequestOptions";


export const ConnectionRequestServiceContext = createContext(undefined);

export const useConnectionRequestService = () => {
    const context = useContext(ConnectionRequestServiceContext);
    if (context === undefined) {
        throw new Error("Connection Request Service was not provided");
    }
    return context;
};

const ConnectionRequestService = ({children}) => {
    const connectionsRequestService = {

        async addConnectionRequest(connectionRequest) {

            try {
                var myHeaders = new Headers();
                let user = JSON.parse(localStorage.getItem('currentUser'));
                console.log(user)
                const userEmail = user.userEmail;
                const password = user.userPassword;
                myHeaders.append('Authorization', 'Basic ' + btoa(`${userEmail}:${password}`))
                myHeaders.append('Accept', "application/json")
                myHeaders.append("Content-Type", "application/json")


                const requestOptions = {
                    method: 'POST',
                    mode: 'cors',
                    headers: myHeaders,
                    credentials: 'same-origin',
                    body: JSON.stringify(connectionRequest)
                }
                //console.log(connectionRequest)
                const res = await fetch(`${AppSiteApi.appSiteBaseUrl}ConnectionRequest`, requestOptions)

                if (res.status === 400) {
                    alert('Ops 400 ERROR')
                }
                const data = res.json()
                //console.log(res);
            } catch (error) {
                console.log(error)
            }
        },


        async fetchPendentConnectionRequests(currentUser) {
            const requestOptions = requestOptionsGet;

            const userId = currentUser.id;
            const res = await fetch(
                `${AppSiteApi.appSiteBaseUrl}ConnectionRequest/mypendent=${userId}`,
                requestOptions);
            if (!res.ok || typeof res === "undefined") {
                throw Error("Opps Something went wrong with fetch");
            }

            const data = await res.clone().json();

            return data;
        },

        async updateState(id, state) {

            try {
                var myHeaders = new Headers();
                let user = JSON.parse(localStorage.getItem('currentUser'));
                console.log(user)
                const userEmail = user.userEmail;
                const password = user.userPassword;
                myHeaders.append('Authorization', 'Basic ' + btoa(`${userEmail}:${password}`))
                myHeaders.append('Accept', "application/json")
                myHeaders.append("Content-Type", "application/json")


                const requestOptions = {
                    method: 'PUT',
                    mode: 'cors',
                    headers: myHeaders,

                    credentials: 'same-origin',


                    body: JSON.stringify(state)

                }

                const res = await fetch(`
            ${AppSiteApi.appSiteBaseUrl}ConnectionRequest/${id}?update=${state}`,
                    requestOptions)

                if (res.status === 400) {
                    alert('Oppps 400 ERROR')

                }
                const data = res.json()


            } catch (error) {
                console.log(error)
            }
        }

    };

    return (
        <>
            <ConnectionRequestServiceContext.Provider value={connectionsRequestService}>
                {children}
            </ConnectionRequestServiceContext.Provider>
        </>
    );
};

export default ConnectionRequestService;