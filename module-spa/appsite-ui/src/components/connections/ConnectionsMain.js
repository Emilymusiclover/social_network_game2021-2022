import React from 'react'
import {useEffect, useState} from "react";
import {useLocalStorage} from 'usehooks-ts'
import ConnectionRequestMenu from '../connection-request/ConnectionRequestMenu';
import PendentConnectionRequest from '../connection-request/PendentConnectionRequest';
import FriendRecommendations from './FriendRecommendations';

const ConnectionsMain = ({setOptions}) => {

    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null)
    const [isValid, setValid] = useLocalStorage('isValid', false)

    const options = [
        {text: 'ConnectionsMain', path: "/connections", component: this},
        {text: 'Create Connection Request', path: "/connections/connection", component: <ConnectionRequestMenu/>},
        {text: 'Pendent Connection Request', path: "/connections/pendent", component: <PendentConnectionRequest/>},
        {
            text: 'Friend Recommendations',
            path: "/connections/friendRecommendations",
            component: <FriendRecommendations/>
        },
    ]

    useEffect(() => {
        let localOptions = options
        if (!isValid) localOptions = options.filter(op => op.path !== "/connections/introduction")
        setOptions(localOptions)
        // console.log(optionsFilter)
        // return () => setOptions([]);
    }, [isValid, setOptions])

    return options[1].component
}

ConnectionsMain.propTypes = {}

export default ConnectionsMain
