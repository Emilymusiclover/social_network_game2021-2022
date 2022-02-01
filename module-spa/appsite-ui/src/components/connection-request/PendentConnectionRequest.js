import React from 'react'
import {useEffect, useState} from "react";
import Header from '../general/Header'
import ConnectionRequests from './ConnectionRequests';
import {useLocalStorage} from 'usehooks-ts'
import {useConnectionRequestService} from "../../services/ConnectionRequestService";


const PendentConnectionRequest = () => {

    const [connectionRequests, setConnectionRequests] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setPending] = useState(false);
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
    const connectionRequestService = useConnectionRequestService();

    useEffect(() => {

        const getPendentConnectionRequests = async () => {
            const pendentConnectionRequests = await connectionRequestService.fetchPendentConnectionRequests(currentUser).catch((err) => {
                setError(err.message);
                setPending(true);
            });

            setConnectionRequests(pendentConnectionRequests);
            setPending(false);
        };
        getPendentConnectionRequests();
        if (typeof connectionRequests == 'undefined' || connectionRequests.length === 0) {
            setPending(true);
        }

    }, [isPending, setPending, connectionRequests, setConnectionRequests]);

    const onClickAccept = (id) => {
        if (typeof id !== 'undefined') {
            updateState(id, "accepted");
            setPending(true);
        }
    }

    const onClickReject = (id) => {
        if (typeof id !== 'undefined') {
            updateState(id, "rejected");
            setPending(true);
        }
    }

    const updateState = async (id, state) => {
        await connectionRequestService.updateState(id, state).catch((err) => {
        });
    };

    return (
        <div className="container-pendent container">
            <Header title={'Pendent Connection Request'}></Header>
            {!isPending ? <ConnectionRequests connectionRequests={connectionRequests} onClickAccept={onClickAccept}
                                              onClickReject={onClickReject}/> : "No Pendent Connection Requests To Show"}
        </div>
    );
}

export default PendentConnectionRequest

