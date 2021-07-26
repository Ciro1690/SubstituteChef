import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core'; 
import CompanyCard from './CompanyCard';
import ChefApi from '../api/api';
import Map from './Map';
import '../../styles/CompanyCard.css';

const MobileList = () => {

    const [companies, setCompanies] = useState([]);
    const [clickedCompany, setClickedCompany] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [mapSelected, setMapSelected] = useState(false);

    useEffect(() => {
        async function getCompanies() {
            let companies = await ChefApi.getAllCompanies();
            setCompanies(companies);
            setIsLoaded(true);
        }
        getCompanies();
    }, []);

    return (
        <>
        { mapSelected ? 
            <>
                <div className="nav-buttons">
                    <Button variant="contained" color="primary" onClick={() => setMapSelected(false)}>List</Button>
                    <Button variant="contained" color="secondary">Map</Button>
                </div>
                <Map 
                    companies={companies}
                    clickedCompany={clickedCompany}
                    setClickedCompany={setClickedCompany}
                /> 
            </>
            :
            <div className="container-fluid">
                <div className="nav-buttons">
                    <Button variant="contained" color="primary">List</Button>
                    <Button variant="contained" color="secondary" onClick={() => setMapSelected(true)}>Map</Button>
                </div>
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
            </div>
        }
    </>
    )
}

export default MobileList;