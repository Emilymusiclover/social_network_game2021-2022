import React from 'react'
import {useState, useEffect, useMemo} from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {useLocalStorage} from 'usehooks-ts'
import PropTypes from 'prop-types'

const MainNav = ({options, setOptions}) => {

    // user login context
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null)
    const [isValid, setValid] = useLocalStorage('isValid', false)

    useEffect(() => {
        const checkUserValid = () => {
            // console.log(currentUser)
            const user = localStorage.getItem('currentUser');
            if (typeof user !== 'undefined' && user !== null) {
                setValid(true);
            } else if (typeof user === 'undefined' || user === null) {
                setValid(false)
            }
        };
        checkUserValid()
    }, [isValid]);

    // component return
    return (
        <nav className='main-nav'>
            <Link to='/'>Home</Link>
            <Link to='/user'>User</Link>
            {isValid ? (<Link to='/connections'>Connections</Link>) : ""}
            {isValid ? (<Link to='/introduction'>Introduction Requests</Link>) : ""}
            {isValid ? (<Link to='/tags'>Tags</Link>) : ""}
            {isValid ? (<Link to='/feed'>Feed</Link>) : ""}
            <Link to='/network'>Network</Link>
            <Link to='/about'>About</Link>
            {!isValid ? (<Link to='/login'>Login</Link>) : (<Link to='/logout'>Logout</Link>)}
        </nav>
    )
}

MainNav.defaultProps = {
    // color: 'steelblue'
}

MainNav.propTypes = {
    // text: PropTypes.string
}

export default MainNav
