import React, { useState, useEffect } from 'react';
import ChefApi from '../api/api';
import { Button } from '@material-ui/core';
import { formatDate } from '../utilities/utility'; 

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
        if (!decided && currentUser !== null) {
            getApplications()
        }
    }, [companies, currentUser, decided])


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
            const job = await ChefApi.deleteJob(id)
            console.log(job)
            alert(`Deleted job`)
        }
        catch (err) {
            console.log(err)
            setErrors(`Unable to delete job`)
        }
    }

    return (
        !isLoading && companies.length > 0 ?
        <div className="container">
            <h1>Current Applications</h1>
            <div className="row applications-ul">
                {companies.map(company => (
                    <div className="col" key={company[0].id}>
                        <h3>{company[0].name}</h3>
                        <p>{company[0].address}</p>
                        <p><a href={company[0].url} target="blank">{company[0].url}</a></p>
                        <br></br>
                        <div className="row">
                            {company[1].length > 0 ?
                            company[1].map(application => (
                                <div className="col" key={application.id}><b>Open Positions</b>   
                                    <p>Position: {application.position}</p>
                                    <p>Hourly Pay: {application.hourly_pay}</p>
                                    <p>Date: {formatDate(application.date)}</p>
                                    <Button 
                                        onClick={() => deleteJob(application.id)}
                                        variant="contained" 
                                        color="primary">
                                        Delete Job
                                    </Button>
                                    <br></br><br></br>
                                    {application.applications.length > 0 ?
                                        application.applications.map(applicant => (
                                        <div key={applicant[0]}>
                                            <p>Applicant: {applicant[1]}</p>
                                            <p>Status: {applicant[2]}</p>
                                            {applicant[2] === "PENDING" && !decided ?
                                            <div>
                                                <Button onClick={acceptApplicant([applicant[1], application.id])} color="secondary">Accept</Button>
                                                <Button onClick={denyApplicant([applicant[1], application.id])} color="primary">Deny</Button>
                                            </div>
                                            : null }
                                            <div>
                                                {errors.length ?
                                                <p>{errors}</p>
                                                : null }
                                            </div>
                                            <br></br>
                                        </div> 
                                        ))
                                    : <p>No applicants</p> }
                                </div>
                                ))
                            : <p>No applications to display</p>}
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