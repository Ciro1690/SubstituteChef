import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
    Form,
    FormGroup,
    Button
} from 'reactstrap'; 

const Login = ({LogIn}) => {
    const INITIAL_DATA = {
        username: "",
        password: "", 
    };

    const [formData, setFormData] = useState(INITIAL_DATA);
    const [errors, setErrors] = useState([]);
    let history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        const LoginData = {
            "username": formData.username,
            "password":formData.password           
        };
        const result = await LogIn(LoginData)
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
            <h1>Login for Substitute Chef</h1>
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
                {errors.length ?
                    <p>{errors}</p>
                : null }
                <Button>Log In</Button>
            </Form>
        </div>
    )
}

export default Login;