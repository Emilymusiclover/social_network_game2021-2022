import React from 'react'
import {Routes, Route, Link} from 'react-router-dom';
import PropTypes from 'prop-types'

const SecondaryNav = ({options}) => {
    // option = {text, path, component}
    if (options === undefined) return (<nav className='secondary-nav'/>)
    return (
        <>
            <nav className='secondary-nav'>
                {options.slice(1).map((option, index) =>
                    <Link key={index} to={option.path}>{option.text}<br/></Link>)}
            </nav>
            <Routes>
                {options.map((option, index) =>
                    <Route key={index} exact path={option.path} element={option.component}/>)}
            </Routes>
        </>
    )
}

SecondaryNav.propTypes = {
    options: PropTypes.array
}

export default SecondaryNav
