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
        <div className="mt-3">
            <h1>Current Applications</h1>
            <div className="container border mt-5">
                {!isLoaded ? <div>Loading...</div> : null}
                <div className="row">
                    {applications.map(application => (
                        <div className="col border" key={application.job.id}>
                            <h1>{application.company.name}</h1>
                            <h4>{application.company.address}</h4>
                            <h4><a href={application.company.url}>{application.company.url}</a></h4>
                            <h2>Application</h2>
                            <h4>{application.job.position}</h4>
                            <h4>${application.job.hourly_pay}/hour</h4>
                            <h4>{formatDate(application.job.date)}</h4>
                            <h4>{application.status}</h4>
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