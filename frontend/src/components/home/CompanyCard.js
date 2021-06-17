import React, { useState, useEffect, useContext } from 'react';
import { getJobsForCompany } from '../utilities/utility';
import JobCard from "./JobCard";
import UserContext from '../routes/UserContext';
import '../../styles/CompanyCard.css';

const CompanyCard = ({ company, setClickedCompany, clickedCompany }) => {
    const currentUser = useContext(UserContext);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id, name, url, address } = company;

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

    const setCompany = () => {
        setClickedCompany(company)
    }

    if (isLoading) {
        return <p>Loading</p>
    }

    return (
        <div className="company-card container">
            <div onClick={setCompany} className={clickedCompany.name === name ? "selected-card row" : "inner-card row"}>
                <div className="company-info col">
                    <h1>{name}</h1>
                    <h4>{address}</h4>
                    <h5><a href={url} target="blank">{url}</a></h5>
                </div>
                {currentUser.currentUser == null ? null 
                :
                <div className="company-info col">
                    <h5 className="text-center">Jobs</h5>
                    <div className="row">
                    {jobs.length > 0 ? jobs.map(job => (
                        <JobCard key={job.id} job={job}/>
                    )) : <p className="text-center">No jobs to display</p>}
                    </div>
                </div>
                 }
            </div>
        </div> 
    )
}

export default CompanyCard;