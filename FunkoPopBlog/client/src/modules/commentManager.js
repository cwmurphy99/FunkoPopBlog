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

export const getCommentById = (commentId) => {
    return getToken().then(token => {
        return fetch(`${apiUrl}/${commentId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        }).then((resp) => resp.json());
    })
};

export const updateComment = (comment) => {
    return getToken().then(token => {

        return fetch(`${apiUrl}/${comment.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment),
        });
    })
}