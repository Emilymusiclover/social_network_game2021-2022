import React from 'react'
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import axios from "axios"
import ConnectionRequests from './ConnectionRequests'
import Header from '../general/Header'
import FormCreateConnectionRequest from './FormCreateConnectionRequest'
import PendentConnectionRequest from './PendentConnectionRequest'
import {authHeader} from "../general/RequestHeader";
import {useLocalStorage} from 'usehooks-ts'
import {useConnectionRequestService} from "../../services/ConnectionRequestService";

const ConnectionRequestMenu = () => {

    const connectionRequestService = useConnectionRequestService();
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
    const [userSent, setUserSent] = useState(null);

    const addConnectionRequest = async (connectionRequest) => {
        await connectionRequestService.addConnectionRequest(connectionRequest);
    }

    return (
        <div className="container">
            <Header title={'Create Connection Request'}/>
            <FormCreateConnectionRequest onAdd={addConnectionRequest}/>
        </div>
    );
}

ConnectionRequestMenu.propTypes = {}

export default ConnectionRequestMenu

