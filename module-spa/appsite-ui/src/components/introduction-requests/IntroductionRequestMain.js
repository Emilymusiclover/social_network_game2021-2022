import React from 'react'
import {useEffect, useState} from "react";
import {useLocalStorage} from 'usehooks-ts'
import IntroductionRequestMenu from './IntroductionRequestMenu';
import PendentIntroductionRequest from './PendentIntroductionRequest';

const IntroductionRequestsMain = ({setOptions}) => {

    const [optionsMenu, setOptionsMenu] = useState([])
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null)
    const [isValid, setValid] = useLocalStorage('isValid', false)

    const options = [
        {text: 'Introduction Requests Main', path: "/introduction", component: this},
        {text: 'Create Introduction Request', path: "/introduction/request", component: <IntroductionRequestMenu/>},
        {text: 'Pendent Introduction Request', path: "/introduction/pendent", component: <PendentIntroductionRequest/>}
    ]

    useEffect(() => {
        //setOptions(options)
        let optionsFilter;
        if (!isValid) {
            optionsFilter = options.filter(op => op.path !== "/introduction/pendent")
            setOptions(optionsFilter)
        } else {
            setOptions(options)
        }

        // console.log(optionsFilter)
        // return () => setOptions([]);
    }, [])

    return options[1].component
}

IntroductionRequestsMain.propTypes = {}

export default IntroductionRequestsMain