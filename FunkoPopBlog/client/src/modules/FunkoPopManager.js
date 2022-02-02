import { getToken } from "./authManager";

const apiUrl = "/api/FunkoPop"

export const getFunkoPops = () => {
    return getToken().then(token => {
        return fetch(apiUrl, {
            method: "GET",
            headers: {
                pragma: "no-cache",
                "cache-control": "no-cache",
                "cache-control": "no-store",
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get Posts.");
            }
        })
    })
}


export const getFunkoPopsById = (id) => {
    return getToken().then(token => {
        return fetch(`${apiUrl}/${id}`, {
            method: "GET",
            headers: {
                pragma: "no-cache",
                "cache-control": "no-cache",
                "cache-control": "no-store",
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
    })
}