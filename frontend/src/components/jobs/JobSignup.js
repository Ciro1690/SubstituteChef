import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { registerJob } from '../utilities/utility';
import {
    Form,
    FormGroup,
    Button
} from 'reactstrap'; 
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
        console.log(registerData)
        const result = await registerJob(registerData)
        console.log(result)
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
        console.log(name, value)
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
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <label id="position">Position: </label>
                    <input
                        type="text"
                        name="position"
                        onChange={handleChange}
                        value={formData.position}
                    />
                </FormGroup>
                <FormGroup>
                    <label id="hourlyPay">Hourly Pay: </label>
                    <input
                        type="number"
                        min="14"
                        name="hourlyPay"
                        onChange={handleChange}
                        value={formData.hourlyPay}
                    />
                </FormGroup>
                <FormGroup>
                    <label id="date">Date: </label>
                    <input
                        type="date"
                        name="date"
                        onChange={handleChange}
                        value={formData.date}
                    />
                </FormGroup>
                <FormGroup>
                    <label id="company">Company:</label>
                        <select name="companyId" value={formData.companyId} onChange={handleChange}>
                            {companies.map(company => (
                                <option value={company.id} key={company.id}>{company.name}</option>
                            ))}
                        </select>
                </FormGroup>
                <Button>Submit</Button>
                <div>
                    {errors.length ?
                        <p>{errors}</p>
                    : null }
                </div>
            </Form>
        </div>
        :
        <h1>Register a company to post a job</h1>
    )
}

export default JobSignUp;