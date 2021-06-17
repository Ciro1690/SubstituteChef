import React, { useState, useEffect } from 'react';
import ChefApi from '../api/api';
import { Button } from '@material-ui/core';
import { formatDate } from '../utilities/utility'; 

const CompaniesApplications = ({currentUser}) => {
    const [companies, setCompanies] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
        }
        if (isLoading && currentUser !== null) {
            getApplications()
        }
    }, [companies, currentUser, isLoading])


    const acceptApplicant = ([username, jobId]) => async (e) => {
        const status = await ChefApi.updateApplication(username, jobId, {status: "APPROVED"})
        alert(`You have ${status} this job`)
    }

    const denyApplicant = ([username, jobId]) => async (e) => {
        const status = await ChefApi.updateApplication(username, jobId, {status: "DENIED"})
        alert(`You have ${status} this job`)    
    }

    return (
        !isLoading && companies.length > 0 ?
        <div className="container">
            <h1>Current Applications</h1>
            <div className="row applications-ul">
                {companies.map(company => (
                    <div className="col" key={company[0].id}>
                        <h3>{company[0].name}</h3>
                        <p>Address: {company[0].address}</p>
                        <p>URL: {company[0].url}</p>
                        <br></br>
                        {company[1].length > 0 ?
                        company[1].map(application => (
                            <div key={application.id}><b>Open Positions</b>   
                                <p>Position: {application.position.toUpperCase()}</p>
                                <p>Hourly Pay: {application.hourly_pay}</p>
                                <p>Date: {formatDate(application.date)}</p>
                                {application.applications.length > 0 ?
                                    application.applications.map(applicant => (
                                    <div key={applicant[0]}>
                                        <p>Applicant: {applicant[1]}</p>
                                        <p>Status: {applicant[2]}</p><br></br>
                                        {applicant[2] === "PENDING" ?
                                        <div>
                                            <Button onClick={acceptApplicant([applicant[1], application.id])} variant="contained" color="primary">Accept</Button>
                                            <Button onClick={denyApplicant([applicant[1], application.id])} variant="contained" color="secondary">Deny</Button>
                                        </div>
                                        : null }
                                    </div> 
                                    ))
                                : <p>No applicants</p> }
                            </div>
                            ))
                         : <p>No applications to display</p>}
                    </div>
                ))}
            </div>
        </div>
        : 
        <h1>Currently no applications to display</h1>
    )
}

export default CompaniesApplications;