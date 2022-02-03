import { getToken } from "./authManager";

const apiUrl = "/api/BlogPost"

export const getBlogPosts = () => {
    return getToken().then(token => {
        return fetch(apiUrl, {
            method: "GET",
            headers: {
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

export const getUserBlogPosts = () => {
    return getToken().then(token => {
        return fetch(`${apiUrl}/userposts`, {
            method: "GET",
            headers: {
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

export const getBlogPostById = (id) => {
    return getToken().then(token => {
        return fetch(`${apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
    })
}

export const addBlogPost = (newPost) => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get posts.");
            }
        });
    });
};

export const updateBlogPost = (editedPost) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${editedPost.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedPost)
        }).then((res) => {
            if (res.ok) {
                return
            } else {
                throw new Error("An unknown error occurred while trying to get posts.");
            }
        });
    });
};


export const deleteBlogPost = (post) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${post}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        }).then((res) => {
            if (res.ok) {
                return
            } else {
                throw new Error("An unknown error occurred while trying to get posts.");
            }
        });
    });
};



