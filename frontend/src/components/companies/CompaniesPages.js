import React from 'react';
import { Button } from '@material-ui/core';

const CompaniesPages = () => {
    return (
        <div>
            <h1>Company Resources</h1>
            <a href="/companyprofile"><Button color="secondary">Profile</Button></a><br></br>
            <a href="/company"><Button color="primary">Create new Company</Button></a><br></br>
            <a href="/job"><Button color="secondary">Post a job</Button></a><br></br>
            <a href="/companiesapplications"><Button color="primary">Applications</Button></a><br></br>
        </div>
    )
}

export default CompaniesPages;