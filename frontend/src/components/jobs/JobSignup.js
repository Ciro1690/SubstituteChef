import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { registerJob } from '../utilities/utility';
import {
    TextField,
    MenuItem,
    Select,
    InputLabel,
    Button
} from '@material-ui/core'; 
import "../../styles/Register.css"
import ChefApi from '../api/api';

const JobSignUp = ({ currentUser }) => {

    const INITIAL_DATA = {
        position: "",
        hourlyPay: "", 
        date: "",
        companyId: ""
    };

    const [formData, setFormData] = useState(INITIAL_DATA);
    const [errors, setErrors] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    let history = useHistory();

    useEffect(() => {
        async function getCompanies() {
            let companyList = await ChefApi.getCompaniesFromUsername(currentUser);
            setCompanies(companyList.companies);
            setIsLoaded(true);
        }
        getCompanies();
    }, [currentUser]);

    const handleSubmit = async e => {
        e.preventDefault();
        const registerData = {
            "position": formData.position,
            "hourlyPay":formData.hourlyPay,
            "date": formData.date,
            "companyId": formData.companyId         
        };
        const result = await registerJob(registerData)
        setFormData(INITIAL_DATA);
        
        if (result.success) {
            alert("Added new job")
            history.push("/");
        } else {
            setErrors(result.errors);
        }
    }
    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    return (
        companies.length > 0 ? 
        <div>
            <h1>Post a Job</h1>
            {!isLoaded ? <div>Loading...</div> : null}
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    label="Position"
                    type="text"
                    name="position"
                    onChange={handleChange}
                    value={formData.position}/>
                    <br></br>
                <TextField
                    required
                    label="Hourly Pay"
                    type="number"
                    min="14"
                    name="hourlyPay"
                    onChange={handleChange}
                    value={formData.hourlyPay}/>
                    <br></br>
                <TextField
                    required
                    type="date"
                    label="Date"
                    name="date"
                    onChange={handleChange}
                    value={formData.date}
                    InputLabelProps={{
                        shrink: true,
                    }}/>
                    <br></br>
                <InputLabel>Company</InputLabel>
                <Select
                    required
                    displayEmpty
                    label="Company"
                    name="companyId" 
                    value={formData.companyId} 
                    onChange={handleChange}>
                    {companies.map(company => (
                        <MenuItem value={company.id} key={company.id}>{company.name}</MenuItem>
                    ))}
                    </Select><br></br>
                <Button 
                    type="submit"
                    variant="contained" 
                    color="primary">Post Job</Button>
                <div>
                    {errors.length ?
                        <p>{errors}</p>
                    : null }
                </div>
            </form>
        </div>
        :
        <h1>Register a company to post a job</h1>
    )
}

export default JobSignUp;