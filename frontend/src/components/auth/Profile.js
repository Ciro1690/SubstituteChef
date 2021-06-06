import React, { useState, useContext } from 'react';
import UserContext from '../routes/UserContext';
import {
    Form,
    FormGroup,
    Button
} from 'reactstrap'; 

const Profile = ({editUser, setUserInfo}) => {
    const { userInfo } = useContext(UserContext);
    console.log(userInfo)

    const INITIAL_STATE = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState([]);


        const handleSubmit = async e => {
        e.preventDefault();
        const editData = {
            "firstName": formData.firstName,
            "lastName": formData.lastName,
            "email": formData.email,
            "isCompany": formData.isCompany            
        };
        await editUser(userInfo.username, editData)
            .then((res) => {
                if (res.success) {
                    const NEW_STATE = {
                        firstName: res.user.firstName,
                        lastName: res.user.lastName,
                        email: res.user.email,
                        isCompany: res.user.isCompany,
                    }
                    setUserInfo(data => ({
                        ...data,
                        ...NEW_STATE
                    }))
                    alert("Updated user info")
                }
                else {
                    setErrors(res.errors);
                }
            })
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
        <>
            <h1>{userInfo.firstName}'s Profile</h1>
            <Form onSubmit={handleSubmit}>
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
                    <label id="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                    />
                </FormGroup>
                <FormGroup>
                    <label id="isCompany">Are you a Business?: </label>
                    <input
                        type="checkbox"
                        name="isCompany"
                        onChange={handleChange}
                        value={formData.isCompany}
                    />
                </FormGroup>
                <Button>Submit</Button>
                <div>
                    {errors.length ?
                        <p>{errors}</p>
                    : null }
                </div>
            </Form>
        </>
    )
}

export default Profile;