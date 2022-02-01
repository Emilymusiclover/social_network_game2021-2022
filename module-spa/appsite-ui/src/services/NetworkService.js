import React from "react";
import AppSiteApi from "../apis/AppSiteApi";
import RequestOptions from "../apis/RequestOptions";
import Utils from "./Utils";

const NetworkService = {

    getUserFriends: async (userId) => {
        let url = `${AppSiteApi.appSiteBaseUrl}${AppSiteApi.connections}/userId=${userId}`
        const res = await fetch(url, RequestOptions.basicGet).catch(ex => console.log(ex))
        return await res.json()
    },

    getUser: async (userId) => {
        let url = `${AppSiteApi.appSiteBaseUrl}${AppSiteApi.users}/${userId}`
        const res = await fetch(url, RequestOptions.basicGet).catch(ex => console.log(ex))
        return await res.json()
    },

    hasUser: async (userId) => {
        let user = NetworkService.getUser(userId)
        return user !== null
    },

    getCommonFriends: async (userId1, userId2) => {
        let url = `${AppSiteApi.appSiteBaseUrl}${AppSiteApi.connections}/idUser1=${userId1}&idUser2=${userId2}`
        const res = await fetch(url, RequestOptions.basicGet).catch(ex => console.log(ex))
        return await res.json()
    },

    getFriendRecommendations: async (userId) => {
        const res = await fetch(`${AppSiteApi.appSiteBaseUrl}Ai/FriendRecommendations/userId=${userId}`).catch(ex => console.log(ex))
        return await res.json()
    },

    getNetworkByUserId: async (userId, layer = 3) => {
        let url = `${AppSiteApi.appSiteBaseUrl}${AppSiteApi.networks}/exportAsDto/userId=${userId}&layer=${layer}`
        const res = await fetch(url, RequestOptions.basicGet).catch(ex => console.log(ex))
        return await res.json()
    },

    makeConnectionRequest: async (request) => {
        let url = `${AppSiteApi.appSiteBaseUrl}ConnectionRequest/`
        console.log(Utils.debugFormat(JSON.stringify(request), 'NetworkService'))
        let options = RequestOptions.generateBasicPost(request)
        const res = await fetch(url, options).catch(ex => console.log(ex))
        return await res.json()
    },

}

export default NetworkService;