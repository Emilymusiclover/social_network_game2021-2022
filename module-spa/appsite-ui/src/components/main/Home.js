import React from 'react'
import {useEffect} from "react";

const Home = ({setOptions}) => {
    useEffect(() => setOptions(undefined))
    return (
        <h1>Home</h1>
    )
}

export default Home