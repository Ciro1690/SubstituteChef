import React, { useState, useEffect } from 'react';
import ChefApi from '../api/api';
import { formatDate } from '../utilities/utility'; 

const UserApplications = ({currentUser}) => {
    const [applications, setApplications] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function getApplications() {
            const jobApps = [];
            try {
                const userInfo = await ChefApi.getUserInfo(currentUser)
                    for (let [jobId, status] of userInfo.applications) {
                        const job = await ChefApi.getJob(jobId);
                        let company = await ChefApi.getCompany(job.company_id)
                        jobApps.push({ job, status, company });
                    }
                    setApplications(jobApps)
                    setIsLoaded(true);

            }
            catch (err) {
                console.log(err)
            }
        }
        getApplications();
    }, [currentUser]);

    return (
        applications.length > 0 ?
        <div>
            <h1>Current Applications</h1>
            <div className="container">
                {!isLoaded ? <div>Loading...</div> : null}
                <div className="row">
                    {applications.map(application => (
                        <div className="col" key={application.job.id}>
                            <h3>{application.company.name}</h3>
                            <p>Address: {application.company.address}</p>
                            <p>URL: {application.company.url}</p>
                            <h3>Application</h3>
                            <p>Position: {application.job.position}</p>
                            <p>Hourly Pay: {application.job.hourly_pay}</p>
                            <p>Date: {formatDate(application.job.date)}</p>
                            <p>Status: {application.status}</p><br></br>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        : 
        <h1>Apply to jobs to view applications</h1>
    )
}

export default UserApplications;