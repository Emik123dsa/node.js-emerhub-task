const API_SCHEMA = "";
import fetch from "isomorphic-fetch";

const callApi = async (endpoint, schema) => {
    const API_BASE_URL = endpoint.indexOf(API_SCHEMA) === -1 ? API_SCHEMA + endpoint : endpoint;

    return await fetch(API_BASE_URL)
        .then((response) => response.json().then((json) => ({ json, response })))
        .then(({ response, json }) => {
            if (!response.ok) {
                return Promise.reject(json)
            }
            return Object.assign({}, json)
        })
        .then((response) => ({ response }),
            (error) => ({ error: error.message || "API_SCHEMA ERROR" }))
}