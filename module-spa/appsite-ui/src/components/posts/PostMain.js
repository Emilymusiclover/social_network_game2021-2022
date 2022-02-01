import React from 'react'
import UserFeed from './UserFeed'
import {useEffect, useState} from "react";
import {useLocalStorage} from 'usehooks-ts'

const options = [
    {text: 'Feed', path: '/feed', component: this},
    {text: 'My Feed', path: '/myfeed', component: <UserFeed/>},

]


const PostMain = ({setOptions}) => {
    const [isValid, setValid] = useLocalStorage('isValid', false)
    useEffect(() => {
        let optionsFinal = options;


        if (!isValid) {

            optionsFinal = options
                .filter(op => op.path !== '/feed')
                .filter(op => op.path !== '/myfeed')


        }
        setOptions(optionsFinal)

    }, [])

    return options[1].component
}


PostMain.propTypes = {}


export default PostMain
