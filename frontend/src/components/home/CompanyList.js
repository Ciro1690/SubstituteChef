import React, { useEffect, useState } from 'react';
import CompanyCard from './CompanyCard';
import ChefApi from '../api/api';
import Map from './Map';

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
            <div className="row">
                <div className="company-list col">
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
                <div className="col">
                    <Map 
                        companies={companies}
                        clickedCompany={clickedCompany}
                    />
                </div>
            </div>
        </div>
    )
}

export default CompanyList;