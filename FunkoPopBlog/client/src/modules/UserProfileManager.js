import { getToken } from "./authManager";

const apiUrl = "/api/userprofile"

export const _getAllProfiles = () => {
    return getToken().then((token) =>
        fetch(`${apiUrl}/getallprofiles`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
}