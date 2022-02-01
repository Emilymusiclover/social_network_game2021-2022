import React from "react";
import {useLocalStorage} from "usehooks-ts";
import NetworkService from "./NetworkService";
import AppSiteApi from "../apis/AppSiteApi";

const Utils = {

    // api request
    getApiState: async () => {
        return await fetch(`${AppSiteApi.appSiteBaseUrl}Aux`).catch(ex => console.log(ex))
    },

    // logging outputs
    debugFormat: (content, origin) => {
        const date = new Date()
        return `DEBUG [${origin}] [${date.toUTCString()}]\n\t>>> ${content}`
    },

    // local storage
    validateUserDataStorage: async () => {
        const key = "currentUser"
        try {
            let user = localStorage.getItem(key);
            let userId = JSON.parse(user).id
            return await NetworkService.hasUser(userId)
        } catch (ex) {
            return false;
        }
    },

    getUserDataStorage: async () => {
        const key = "currentUser"
        try {
            let user = localStorage.getItem(key);
            let userId = JSON.parse(user).id
            return await NetworkService.getUser(userId)
        } catch (ex) {
            return null;
        }
    },
}

export default Utils