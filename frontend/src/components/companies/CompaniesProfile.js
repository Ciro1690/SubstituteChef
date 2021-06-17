import React, { useState, useEffect } from 'react';
import ChefApi from '../api/api';
import EditCompany from './EditCompany';
import { Button } from '@material-ui/core';

const CompaniesProfile = ({ currentUser }) => {
    const [companies, setCompanies] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        async function getCompanies() { 
            const userCompanies = await ChefApi.getCompaniesFromUsername(currentUser);
            setCompanies(userCompanies.companies);
            setIsLoading(false); 
        }
        if (isLoading && currentUser !== null) {
            getCompanies()
        }
    }, [currentUser, isLoading])
    
    return (
        isLoading ? <div>Loading...</div> :
        <div className="container">
            <a href="/companiesapplications"><Button>View Applications</Button></a>
            <h1>Edit Companies</h1>
            <div className="row">
                {companies.map(company => (
                    <EditCompany key={company.id} company={company}/>
                ))}
            </div>
        </div>
    )
}

export default CompaniesProfile;