import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
    FormControlLabel,
    TextField,
    Checkbox,
    Button
} from '@material-ui/core'; 
import "../../styles/Register.css"

const UserSignup = ({ registerUser }) => {
    const INITIAL_DATA = {
        username: "",
        password: "", 
        firstName: "", 
        lastName: "", 
        email: "",
        isCompany: false
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
            "isCompany": formData.isCompany            
        };
        const result = await registerUser(registerData)

        let companyRedirect
        if (formData.isCompany) {
            companyRedirect = true;
        }
        
        setFormData(INITIAL_DATA);
        
        if (result.success) {
            alert("Created account for Substitute Chef")
            if (companyRedirect) {
                history.push("/company")
            }
            else {
                history.push("/");
            }
        } else {
            setErrors(result.errors);
        }
    }

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        console.log(name, value)
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    return (
        <div className="register-div">
            <h1>Welcome to Substitute Chef!</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    label="Username"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}/>
                    <br></br>
                <TextField
                    required
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}/>
                <br></br>
                <TextField
                    required
                    label="First Name"
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    value={formData.firstName}/>
                    <br></br>
                <TextField
                    required
                    label="Last Name"
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    value={formData.lastName}/>
                    <br></br>
                <TextField
                    required
                    label="Email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}/>
                    <br></br>
                <FormControlLabel
                    control={<Checkbox value={formData.isCompany} checked={formData.isCompany} onChange={handleChange} name="isCompany" />}
                    label="Register a Company?"/><br></br>
                <Button 
                    type="submit"
                    variant="contained" 
                    color="primary">Login</Button>
                <div>
                    {errors.length ?
                        <p>{errors}</p>
                    : null }
                </div>
            </form>
        </div>
    )
}

export default UserSignup;