import React, { useState, useEffect } from 'react';
import ChefApi from '../api/api';
import { Button } from '@material-ui/core';
import { formatDate } from '../utilities/utility'; 
import Application from './Application';

const CompaniesApplications = ({currentUser}) => {
    const [companies, setCompanies] = useState(null);
    const [decided, setDecided] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        async function getApplications() { 
            let applicationsArr = []
            const userCompanies = await ChefApi.getCompaniesFromUsername(currentUser);
            for (let company of userCompanies.companies) {
                const companyApplications = await ChefApi.getJobsForCompany(company.id)
                applicationsArr.push([company, companyApplications])
            }
            setCompanies(applicationsArr);
            setIsLoading(false);
            setDecided(false);
        }
        if (isLoading && currentUser !== null) {
            getApplications()
        }
    }, [decided, currentUser, isLoading])


    const acceptApplicant = ([username, jobId]) => async (e) => {
        const status = await ChefApi.updateApplication(username, jobId, {status: "APPROVED"})
        setDecided(true)
        alert(`You have ${status} this job`)
    }

    const denyApplicant = ([username, jobId]) => async (e) => {
        const status = await ChefApi.updateApplication(username, jobId, {status: "DENIED"})
        setDecided(true)
        alert(`You have ${status} this job`)    
    }

     const deleteJob = async (id) => {
        try {
            await ChefApi.deleteJob(id)
            alert(`Deleted job`)
        }
        catch (err) {
            console.log(err)
            setErrors(`Unable to delete job`)
        }
    }

    return (
        !isLoading && companies.length > 0 ?
        <div className="container mt-3">
            <h1>Open Applications</h1>
            <br></br>
            <div className="row applications-ul">
                {companies.map(company => (
                    <div className="col border" key={company[0].id}>
                        <h1>{company[0].name}</h1>
                        <h2>{company[0].address}</h2>
                        <h2><a href={company[0].url} target="blank">{company[0].url}</a></h2>
                        <br></br>
                        <div className="row">                           
                        {company[1].length > 0 ?
                            company[1].map(job => (
                                <div className="col" key={job.id}>
                                        <h2>Job Posting</h2>   
                                        <h4>{job.position}</h4>
                                        <h4>${job.hourly_pay}/hour</h4>
                                        <h4>{formatDate(job.date)}</h4>
                                    {job.applications.length > 0 ?
                                        job.applications.map(applicant => (
                                            <Application 
                                            key={applicant[1]}
                                            applicant={applicant} 
                                            job={job}
                                            acceptApplicant={acceptApplicant}
                                            denyApplicant={denyApplicant}
                                            decided={decided}
                                            />
                                            ))
                                            : <h4>No applicants</h4> }
                                    <Button 
                                        className="mb-3"
                                        onClick={() => deleteJob(job.id)}
                                        variant="contained" 
                                        color="primary">
                                        Remove Posting
                                    </Button>
                                    <div>
                                    {errors.length ?
                                        <p>{errors}</p>
                                    : null }
                                    </div>
                                </div>
                                ))
                            : <h4>No applications to display</h4>}
                         </div>
                    </div>
                ))}
            </div>
        </div>
        : 
        <h1>Currently no applications to display</h1>
    )
}

export default CompaniesApplications;