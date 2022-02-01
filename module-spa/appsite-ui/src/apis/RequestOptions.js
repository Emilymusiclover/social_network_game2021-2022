import {authHeader} from "../components/general/RequestHeader";

// fix me
export const requestOptionsGet = {
    method: "GET",
    mode: "cors",
    headers: authHeader(),
    credentials: 'same-origin'

}

// fix me
export function requestOptionsPostBody(item) {
    return {
        method: "POST",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    }
}

const RequestOptions = {

    basicGet: {
        method: "GET",
        mode: "cors",
        headers: authHeader(),
        credentials: 'same-origin'
    },

    generateBasicPost: (item) => {
        return {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item)
        }
    },
}

export default RequestOptions
