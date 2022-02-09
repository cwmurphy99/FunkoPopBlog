import { getToken } from "./authManager";

const apiUrl = "/api/FunkoPop"
const _apiUrl = "/api/UserProfileFunkoPop"

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



export const addMyFavorite = (id) => {
    return getToken().then(token => {
        return fetch(`${_apiUrl}/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        }).then((res) => {
            if (res.ok) {
                return res;
            }
            else {
                throw new Error("An unknown error occurred while trying to add favorite.");
            }
        });
    });
};



export const getMyCollection = () => {
    return getToken().then(token => {
        return fetch(`${_apiUrl}/MyCollection`, {
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



export const removeMyFavorite = (id) => {
    return getToken().then(token => {
        return fetch(`${_apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        }).then((res) => {
            if (res.ok) {
                return
            }
            else {
                throw new Error("An unknown error occurred while trying to delete comment");
            }
        });
    });
};