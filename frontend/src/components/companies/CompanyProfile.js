import React from 'react';

const CompanyProfile = ({ companies }) => {
return (
    <>
        {companies.companies.map(company => (
            <div key={company.id}>
                <h1>{company.name}</h1>
            </div>
        ))}
    </>
    )
}

export default CompanyProfile;