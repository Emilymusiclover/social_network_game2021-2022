import React from 'react'
import {useEffect, useState} from "react";
import {useLocalStorage} from 'usehooks-ts'
import SeeUserTagCloud from './SeeUserTagCloud';
import SeeMyUserTagCloud from './SeeMyUserTagCloud';

const TagsMain = ({setOptions}) => {

    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null)
    const [isValid, setValid] = useLocalStorage('isValid', false)

    const options = [
        {text: 'TagsMain', path: "/tags", component: this},
        {text: 'See All User Tag Clouds', path: "/tags/userTagCloud", component: <SeeUserTagCloud/>},
        {text: 'See My User Tag Clouds', path: "/tags/MyTagCloud", component: <SeeMyUserTagCloud/>},
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

TagsMain.propTypes = {}

export default TagsMain
