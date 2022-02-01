import React from 'react'
import {useEffect} from 'react';
import {useLocalStorage} from 'usehooks-ts'


import RegisterUser from './RegisterUser';
import EditProfile from './EditProfile';
import UpdateHumourState from '../humour-states/UpdateHumourState';

const options = [
    {text: 'User Main', path: '/user', component: this},
    {text: 'Register User', path: '/user/registerUser', component: <RegisterUser/>},
    {text: 'Edit Profile', path: '/user/editProfile', component: <EditProfile/>},
    {text: 'Edit Humour State', path: '/user/humourState', component: <UpdateHumourState/>}
]

const MainUser = ({setOptions}) => {

    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null)
    const [isValid, setValid] = useLocalStorage('isValid', false)

    useEffect(() => {
        let optionsFinal = options;


        if (!isValid) {

            optionsFinal = options
                .filter(op => op.path !== '/user/editProfile')
                .filter(op => op.path !== '/user/humourState')


        }
        setOptions(optionsFinal)

    }, [])

    return options[1].component
}

MainUser.propTypes = {}

export default MainUser
