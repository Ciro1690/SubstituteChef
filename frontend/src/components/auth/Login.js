import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
    TextField,
    Button
} from '@material-ui/core'; 

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
            <h1>Welcome back!</h1>
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
                    <br></br><br></br>
                {errors.length ?
                    <p>{errors}</p>
                : null }
                <Button 
                    type="submit"
                    variant="contained" 
                    color="primary">Login</Button>
            </form>
        </div>
    )
}

export default Login;