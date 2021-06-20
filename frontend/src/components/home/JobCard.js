import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@material-ui/core'; 
import UserContext from '../routes/UserContext';
import ChefApi from '../api/api';
import { formatDate } from '../utilities/utility';

const JobCard = ({ job }) => {
    const { currentUser } = useContext(UserContext);
    const [applied, setApplied] = useState(false);

        const handleClick = async () => {
            const userInfo = await ChefApi.getUserInfo(currentUser)
            const applications = userInfo.applications
            const newJobId = await ChefApi.applyToJob(currentUser, job.id)
        if (!applications.includes(newJobId)) {
            setApplied(true)
            alert(`Applied to ${job.position}`)
        }
    }
    
    useEffect(() => {
        async function getApplications() {
            const userInfo = await ChefApi.getUserInfo(currentUser)
            if (userInfo.applications.length > 0 && userInfo.applications[0].includes(job.id)) {
                setApplied(true)
            }
        }
        getApplications()
    }, [currentUser, job.id])
    

    return (
        <div className="col-4 text-center">
            <p>Position: {job.position}</p>
            <p>Hourly pay: ${job.hourly_pay}</p>
            <p>Date: {formatDate(job.date)}</p>
            {applied ?
            <Button variant="contained" color="primary">Applied</Button>
            :
            <Button onClick={handleClick} variant="contained" color="secondary">Apply</Button>
            }
        </div> 
    )
}

export default JobCard;