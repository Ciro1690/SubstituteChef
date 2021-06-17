import ChefApi from '../api/api';


export async function editUser(currentUser, formData) {
    try {
        const user = await ChefApi.editUser(currentUser, formData);
        return {success: true, user}
    }
    catch (err) {
        return {success: false, errors: err}
    }
}

export async function editCompany(companyId, formData) {
    try {
        const company = await ChefApi.editCompany(companyId, formData);
        return {success: true, company}
    }
    catch (err) {
        return {success: false, errors: err}
    }
}

export async function registerJob (formData) {
    try {
        const job = await ChefApi.signUpJob(formData)
        return {success: true, job}
    } catch (err) {
        return {success: false, errors: err}
    }
}

export async function registerCompany (formData) {
    try {
        await ChefApi.signUpCompany(formData)
        return {success: true}
    } catch (err) {
        return {success: false, errors: err}
    }
}

export async function getCompaniesFromUsername (formData) {
    try {
        await ChefApi.getCompaniesFromUsername(formData)
        return {success: true}
    } catch (err) {
        return {success: false, errors: err}
    }
}

export async function getJobsForCompany (formData) {
    try {
        const jobs = await ChefApi.getJobsForCompany(formData)
        return {success: true, jobs}
    } catch (err) {
        return {success: false, errors: err}
    }
}

export function formatDate(date) {
        let dateArr = date.split("-")
        let year = dateArr[0];
        let month = dateArr[1];
        let day = dateArr[2].substring(0,2);
        return `${month}/${day}/${year}`
}