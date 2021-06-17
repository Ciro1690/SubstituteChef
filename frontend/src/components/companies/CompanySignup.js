import React, { useState } from 'react';
import { registerCompany } from '../utilities/utility';
import { useHistory } from 'react-router';
import {
    TextField,
    Button
} from '@material-ui/core'; 
import "../../styles/Register.css"

const CompanySignup = ({ currentUser }) => {
    const INITIAL_DATA = {
        name: "",
        url: "", 
        address: ""
    };

    const [formData, setFormData] = useState(INITIAL_DATA);
    const [errors, setErrors] = useState({});
    let history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        console.log("submit")
        const registerData = {
            "name": formData.name,
            "url":formData.url,
            "address": formData.address,
            "username": currentUser           
        };
        const result = await registerCompany(registerData)
        setFormData(INITIAL_DATA);
        
        if (result.success) {
            alert("Added new company")
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
        <div>
            <h1>Register Company</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    label="Company name"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}/>
                <br></br>
                <TextField
                    required
                    label="URL"
                    type="text"
                    name="url"
                    onChange={handleChange}
                    value={formData.url}/>
                <br></br>
                <TextField
                    required
                    label="Address"
                    type="text"
                    name="address"
                    onChange={handleChange}
                    value={formData.address}/>
                <br></br>
                <br></br>
                <Button 
                    type="submit"
                    variant="contained" 
                    color="primary">Create Company</Button>
                <div>
                    {errors.length ?
                        <p>{errors}</p>
                    : null }
                </div>
            </form>
        </div>
    )
}

export default CompanySignup;