import { getToken } from "./authManager";

const apiUrl = "/api/Comment"

export const getComments = (blogPostId) => {
    return getToken().then(token => {
        return fetch(`${apiUrl}/${blogPostId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get comments.");
            }
        })
    })
}
export const addComment = (comment) => {

    return getToken().then(token => {
        return fetch(`${apiUrl}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        }).then((res) => {
            if (res.ok) {
                return res;
            }
            else {
                throw new Error("An unknown error occurred while trying to get comments.");
            }
        });
    });
};

