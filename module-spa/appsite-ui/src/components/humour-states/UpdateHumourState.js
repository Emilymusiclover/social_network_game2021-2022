import PropTypes from 'prop-types'
import { useState, useEffect, useMemo } from "react";
import Utils from "../../services/Utils";

const states = ["None", "Happy", "Sad", "Ok", "NotOk"];

const UpdateHumourState = props => {

    let user;
    useEffect(() => {
        user = JSON.parse(localStorage.getItem('currentUser'));
    })

    const handleChange = async (e) => {
        let {value} = e.target;
        // console.log(value)
        // console.log(user);

        try {
            let userId = user.id
            const url = `https://localhost:5001/api/emotionalStates/userId=${userId}?emotionalState=${value}`
            const request = {
                method: "PATCH",
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            }
            const response = await fetch(url, request)
            // console.log(response)
        } catch (ex) {
            console.log(Utils.debugFormat(`could not update humour : ${ex}`, 'UpdateHumourState'))
        }
    }

    return (
        <div>
            <h1>Update Humour State</h1>
            <select onChange={handleChange}>
                {states.map((state) => <option value={state}>{state}</option>)}
            </select>
        </div>
    )

    //     <Select
    //      onChange={handleChange}
    //      isSearchable={true}
    //      isClearable={true}
    //      value={values}
    //     >
}

UpdateHumourState.propTypes = {

}

export default UpdateHumourState
