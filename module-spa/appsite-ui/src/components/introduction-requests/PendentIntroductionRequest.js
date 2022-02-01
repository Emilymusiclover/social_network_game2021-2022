import React from 'react'
import {useEffect, useState, useContext} from "react";
import Header from '../general/Header'
import IntroductionRequests from './IntroductionRequests';
import {useLocalStorage} from 'usehooks-ts'
import {useIntroductionRequestService} from "../../services/IntroductionRequestService";


const PendentIntroductionRequest = () => {

    const [introductionRequests, setIntroductionRequests] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setPending] = useState(false);
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
    const introductionRequestService = useIntroductionRequestService();


    useEffect(() => {

        const getPendentIntroductionRequests = async () => {
            const pendentIntroRequests = await introductionRequestService.fetchPendentIntroductionRequests(currentUser).catch((err) => {
                setError(err.message);
                setPending(true);
            });

            setIntroductionRequests(pendentIntroRequests);
            setPending(false);
            console.log(introductionRequests);
        };
        getPendentIntroductionRequests();
        if (typeof introductionRequests == 'undefined') {
            setPending(true);
        }

    }, []);

    const onClickAccept = (id) => {
        if (typeof id !== 'undefined') {
            updateState(id, "accepted");
        }
        setPending(true);
    }

    const onClickReject = (id) => {
        if (typeof id !== 'undefined') {
            updateState(id, "rejected");
        }
        setPending(true);
    }

    const updateState = async (id, state) => {
        await introductionRequestService.updateState(id, state).catch((err) => {
        });
    };

    return (
        <div className="container-pendent container">
            <Header title={'Pendent Introduction Request'}></Header>
            {!isPending ?
                <IntroductionRequests introductionRequests={introductionRequests} onClickAccept={onClickAccept}
                                      onClickReject={onClickReject}/> : "No Pendent Introduction Requests To Show"}
        </div>
    );
}

export default PendentIntroductionRequest
