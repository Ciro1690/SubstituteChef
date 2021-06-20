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

/**
 * User api methods
 */

    static async Signup(data) {
        let res = await this.request(`auth/signup`, data, "post");
        return res.token;
    }

    static async Login(data) {
        let res = await this.request(`auth/login`, data, "post");
        return res.token;
    }

    static async getUserInfo(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    static async editUser(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }

    static async deleteUser(username) {
        let res = await this.request(`users/${username}`, {}, "delete");
        return res;
    }

/**
* Company api methods
*/
 
    static async getAllCompanies() {
            let res = await this.request("companies");
            return res.companies;
        }

    static async getCompany(id) {
            let res = await this.request(`companies/${id}`);
            return res.company;
        }

    static async getCompaniesFromUsername(username) {
        let res = await this.request(`companies/username/${username}`);
        return res;
    }

    static async signUpCompany(data) {
        let res = await this.request(`companies/signup`, data, "post");
        return res;
    }

    static async editCompany(id, data) {
        let res = await this.request(`companies/${id}`, data, "patch");
        return res.company;
    }

    static async deleteCompany(id) {
        let res = await this.request(`companies/${id}`, {}, "delete");
        return res;
    }

/**
* Job api methods
*/
 
    static async getAllJobs() {
            let res = await this.request("jobs");
            return res.jobs;
        }

    static async getJob(id) {
            let res = await this.request(`jobs/${id}`);
            return res.job;
        }

    static async getJobsForCompany(companyId) {
            let res = await this.request(`jobs/company/${companyId}`);
            return res.jobs;
        }

    static async signUpJob(data) {
        let res = await this.request(`jobs/new`, data, "post");
        return res;
    }

    static async editJob(id, data) {
        let res = await this.request(`jobs/${id}`, data, "patch");
        return res.job;
    }

    static async deleteJob(id) {
        let res = await this.request(`jobs/${id}`, {}, "delete");
        return res;
    }

    static async applyToJob(username, jobId) {
        let res = await this.request(`users/${username}/jobs/${jobId}`, jobId, "post");
        return res.applied;
    }

    static async updateApplication(username, jobId, status) {
        let res = await this.request(`users/${username}/jobs/${jobId}`, status, "patch");
        return res.status;
    }
 }

ChefApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default ChefApi;