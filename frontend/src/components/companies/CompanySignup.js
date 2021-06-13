import React, { useState } from 'react';
import { registerCompany } from '../utilities/utility';
import { useHistory } from 'react-router';
import {
    Form,
    FormGroup,
    Button
} from 'reactstrap'; 
import "../../styles/Register.css"

const CompanySignup = ({ currentUser }) => {
    const INITIAL_DATA = {
        name: "",
        url: "", 
        address: ""
    };

    const [formData, setFormData] = useState(INITIAL_DATA);
    const [errors, setErrors] = useState([]);
    let history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        const registerData = {
            "name": formData.name,
            "url":formData.url,
            "address": formData.address,
            "username": currentUser           
        };
        const result = await registerCompany(registerData)
        console.log(result)
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
            <h1>Signup a Company</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <label id="name">Company Name: </label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                    />
                </FormGroup>
                <FormGroup>
                    <label id="url">URL: </label>
                    <input
                        type="text"
                        name="url"
                        onChange={handleChange}
                        value={formData.url}
                    />
                </FormGroup>
                <FormGroup>
                    <label id="address">Address: </label>
                    <input
                        type="text"
                        name="address"
                        onChange={handleChange}
                        value={formData.address}
                    />
                </FormGroup>
                <Button>Submit</Button>
                <div>
                    {errors.length ?
                        <p>{errors}</p>
                    : null }
                </div>
            </Form>
        </div>
    )
}

export default CompanySignup;