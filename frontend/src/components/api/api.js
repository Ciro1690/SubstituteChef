import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class ChefApi {

    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.log("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${ChefApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
        return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
        console.error("API Error:", err.response);
        let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
        }
    }

    static async Signup(data) {
        let res = await this.request(`auth/signup`, data, "post");
        return res.token;
    }

    static async Login(data) {
        let res = await this.request(`auth/login`, data, "post");
        return res.token;
    }

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    static async editUser(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }

    static async deleteUser(username) {
        let res = await this.request(`users/${username}`, "delete");
        return res;
    }
}

ChefApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default ChefApi;