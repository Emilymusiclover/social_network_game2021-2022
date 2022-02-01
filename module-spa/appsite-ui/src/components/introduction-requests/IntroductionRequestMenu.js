import React from 'react'
import Header from '../general/Header'
import FormCreateIntroductionRequest from './FormCreateIntroductionRequest'
import {useLocalStorage} from 'usehooks-ts'
import {useIntroductionRequestService} from "../../services/IntroductionRequestService";

const IntroductionRequestMenu = () => {

    const introductionRequestService = useIntroductionRequestService();
    const [currentUser] = useLocalStorage('currentUser', null);

    const addIntroductionRequest = async (introductionRequest) => {
        await introductionRequestService.addIntroductionRequest(currentUser, introductionRequest);
    }

    return (
        <div className="container">
            <Header title={'Create Introduction Request'}></Header>
            <FormCreateIntroductionRequest onAdd={addIntroductionRequest}/>
        </div>
    );
}

IntroductionRequestMenu.propTypes = {}

export default IntroductionRequestMenu
