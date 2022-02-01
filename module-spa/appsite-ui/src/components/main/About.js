import React from 'react'
import PropTypes from 'prop-types'
import {useEffect} from "react";

const About = ({setOptions}) => {
    useEffect(() => setOptions(undefined))
    return (
        <div>
            <h1>About</h1>
            <h3>LAPR5 G08 (2022)</h3>
            <h4>Carlos Anjos</h4>
            <h4>Catarina Pontes</h4>
            <h4>Emily Flores</h4>
            <h4>Joana Bastos</h4>
        </div>
    )
}

About.propTypes = {}

export default About
