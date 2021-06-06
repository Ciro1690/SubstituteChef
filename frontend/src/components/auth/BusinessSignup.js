import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
    Form,
    FormGroup,
    Button
} from 'reactstrap'; 
import "../../styles/Register.css"

const BusinessSignup = ({SignUp}) => {
    const INITIAL_DATA = {
        username: "",
        password: "", 
        firstName: "", 
        lastName: "", 
        email: "",
        wage: ""
    };

    const [formData, setFormData] = useState(INITIAL_DATA);
    const [errors, setErrors] = useState([]);
    let history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        const registerData = {
            "username": formData.username,
            "password":formData.password,
            "firstName": formData.firstName,
            "lastName": formData.lastName,
            "email": formData.email,
            "wage": parseInt(formData.wage)            
        };
        const result = await SignUp(registerData)
        setFormData(INITIAL_DATA);
        
        if (result.success) {
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
            <h1>Signup for Substitute Chef as a Business</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <label id="username">Username: </label>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={formData.username}
                    />
                </FormGroup>
                <FormGroup>
                    <label id="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                    />
                </FormGroup>
                <FormGroup>
                    <label id="firstName">First Name: </label>
                    <input
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        value={formData.firstName}
                    />
                </FormGroup>
                <FormGroup>
                    <label id="lastName">Last Name: </label>
                    <input
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        value={formData.lastName}
                    />
                </FormGroup>
                <FormGroup>
                    <label id="email">Email: </label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                    />
                </FormGroup>
                <FormGroup>
                    <label id="wage">Wage: </label>
                    <input
                        type="number"
                        min="14"
                        step=".1"
                        name="wage"
                        onChange={handleChange}
                        value={formData.wage}
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

export default BusinessSignup;