import React, { useEffect, useState } from 'react';
import CompanyCard from './CompanyCard';
import ChefApi from '../api/api';
import Map from './Map';
import { Grid } from '@material-ui/core';
import '../../styles/CompanyCard.css';

const CompanyList = () => {

    const [companies, setCompanies] = useState([]);
    const [clickedCompany, setClickedCompany] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function getCompanies() {
            let companies = await ChefApi.getAllCompanies();
            setCompanies(companies);
            setIsLoaded(true);
        }
        getCompanies();
    }, []);

    return (
        <div className="container-fluid">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <div className="company-list">
                    {!isLoaded ? <div>Loading...</div> : null}
                    {companies.map(company => (
                        <CompanyCard
                            key={company.id}
                            company={company}
                            clickedCompany={clickedCompany}
                            setClickedCompany={setClickedCompany}
                        />
                    ))} 
                </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Map 
                        companies={companies}
                        clickedCompany={clickedCompany}
                        setClickedCompany={setClickedCompany}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default CompanyList;