import React, { useContext, useEffect, useState } from 'react';
import {
    Button
} from 'reactstrap'; 
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
            if (userInfo.applications.includes(job.id)) {
                setApplied(true)
            }
        }
        getApplications()
    }, [currentUser, job.id])
    

    return (
        <div>
            <p>Position: {job.position}</p>
            <p>Hourly pay: ${job.hourly_pay}</p>
            <p>Date: {formatDate(job.date)}</p>
            {applied ?
            <Button className="btn btn-success btn-sm">Applied</Button>
            :
            <Button onClick={handleClick} className="btn btn-info btn-sm">Apply</Button>
            }
        </div> 
    )
}

export default JobCard;