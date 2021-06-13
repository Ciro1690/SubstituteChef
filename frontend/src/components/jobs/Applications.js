import React, { useState, useEffect } from 'react';
import ChefApi from '../api/api';
import { formatDate } from '../utilities/utility'; 
import '../../styles/Applications.css'

const Applications = ({currentUser}) => {
    const [applications, setApplications] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function getApplications() {
            const jobApps = [];
            try {
                const userInfo = await ChefApi.getUserInfo(currentUser)
                    for (let jobId of userInfo.applications) {
                        const job = await ChefApi.getJob(jobId);
                        let company = await ChefApi.getCompany(job.company_id)
                        jobApps.push({ job, company });
                    }
                    console.log(jobApps)
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
            {!isLoaded ? <div>Loading...</div> : null}
            <ul className="applications-ul">
                {applications.map(application => (
                    <div key={application.job.id}>
                        <li>Company: {application.company.name}</li>
                        <li>Address: {application.company.address}</li>
                        <li>URL: {application.company.url}</li>
                        <br></br>
                        <li>Position: {application.job.position}</li>
                        <li>Hourly Pay: {application.job.hourly_pay}</li>
                        <li>Date: {formatDate(application.job.date)}</li><br></br>
                    </div>
                ))}
            </ul>
        </div>
        : 
        <h1>Apply to jobs to view applications</h1>
    )
}

export default Applications;