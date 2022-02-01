import React from 'react'
import {useEffect} from "react";
import PropTypes from 'prop-types'

import BasicNetworkOverview from "./BasicNetworkOverview";
import BasicNetworkOverview3D from "./BasicNetworkOverview3D";
//import PathIA from "./PathIA"

const options = [
    {text: 'NetworksMain', path: "/network", component: this},
    {text: 'Network Overview (2D)', path: "/network/overview/2D", component: <BasicNetworkOverview/>},
    {text: 'Network Overview (3D)', path: "/network/overview/3D", component: <BasicNetworkOverview3D/>},
    //{text:'Path Solution',path:'/network/path',component: <PathIA/>}
]

const NetworksMain = ({setOptions}) => {

    useEffect(() => {
        setOptions(options)
        // return () => setOptions([]);
    })

    return options[1].component
}

NetworksMain.propTypes = {
    setOptions: PropTypes.func.isRequired
}

export default NetworksMain
