import React, { useState, useEffect, useContext } from 'react';
import { getJobsForCompany } from '../utilities/utility';
import JobCard from "./JobCard";
import UserContext from '../routes/UserContext';
import '../../styles/CompanyCard.css';

const CompanyCard = ({ company, setClickedCompany, clickedCompany }) => {
    const currentUser = useContext(UserContext);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id, name, url, address, lat, lng } = company;

    useEffect(() => {
        async function getJobs() {
            let jobList = await getJobsForCompany(id);
            if (jobList.success) {
                setJobs(jobList.jobs);
            } 
            setIsLoading(false);
        }
        getJobs();
    }, [id]);

    const directions = `https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${lat},${lng}`

    const setCompany = () => {
        setClickedCompany(company)
    }

    if (isLoading) {
        return <p>Loading</p>
    }

    return (
        <div className="company-card container">
            <div onClick={setCompany} className={clickedCompany.name === name ? "selected-card row" : "inner-card row"}>
                <div className="company-info text-center col">
                    <h1>{name}</h1>
                    <h2>{address}</h2>
                    <h4><a href={url} target="blank">{url}</a></h4>
                    <h4><a href={directions} rel="noreferrer" target="_blank">Get Directions</a></h4>
                </div>
                {currentUser.currentUser == null ? null 
                :
                <div className="company-info col">
                    <h2 className="text-center">Jobs</h2>
                    <div className="row">
                    {jobs.length > 0 ? jobs.map(job => (
                        <JobCard key={job.id} job={job}/>
                    )) : <h4 className="text-center">No jobs to display</h4>}
                    </div>
                </div>
                 }
            </div>
        </div> 
    )
}

export default CompanyCard;