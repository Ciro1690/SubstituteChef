import React from 'react';
import { Button } from '@material-ui/core';

const Application = ({applicant, job, acceptApplicant, denyApplicant, decided}) => {
    return (
        <div>
            <h4>{applicant[1]} - {applicant[2]}</h4>
            {applicant[2] === "PENDING" && !decided ?
            <div>
                <Button onClick={acceptApplicant([applicant[1], job.id])} color="secondary">Accept</Button>
                <Button onClick={denyApplicant([applicant[1], job.id])} color="primary">Deny</Button>
            </div>
            : null }
            <br></br>
        </div>         
        )
}

export default Application;
